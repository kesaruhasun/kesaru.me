#!/bin/bash

# System Monitoring Script for kesaru.me
# This script checks system health and application status

LOG_FILE="/var/log/kesaru-monitor.log"
WEBHOOK_URL="$DISCORD_WEBHOOK_URL"  # Set this as environment variable if you want Discord notifications

# Function to log with timestamp
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Function to send Discord notification (optional)
send_notification() {
    if [ -n "$WEBHOOK_URL" ]; then
        curl -H "Content-Type: application/json" \
             -X POST \
             -d "{\"content\":\"🚨 **kesaru.me Alert**: $1\"}" \
             "$WEBHOOK_URL" > /dev/null 2>&1
    fi
}

# Check if application is running
check_app_status() {
    if pm2 list | grep -q "kesaru-portfolio.*online"; then
        log_message "✅ Application is running"
        return 0
    else
        log_message "❌ Application is not running"
        send_notification "Application is down! Attempting restart..."
        
        # Attempt to restart
        pm2 restart kesaru-portfolio
        sleep 10
        
        if pm2 list | grep -q "kesaru-portfolio.*online"; then
            log_message "✅ Application restarted successfully"
            send_notification "Application restarted successfully"
            return 0
        else
            log_message "❌ Failed to restart application"
            send_notification "Failed to restart application - manual intervention required"
            return 1
        fi
    fi
}

# Check HTTP response
check_http_response() {
    local response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health)
    if [ "$response" = "200" ]; then
        log_message "✅ HTTP health check passed"
        return 0
    else
        log_message "❌ HTTP health check failed (Status: $response)"
        send_notification "HTTP health check failed with status: $response"
        return 1
    fi
}

# Check HTTPS response
check_https_response() {
    local response=$(curl -s -o /dev/null -w "%{http_code}" https://kesaru.me/api/health)
    if [ "$response" = "200" ]; then
        log_message "✅ HTTPS health check passed"
        return 0
    else
        log_message "❌ HTTPS health check failed (Status: $response)"
        send_notification "HTTPS health check failed with status: $response"
        return 1
    fi
}

# Check disk space
check_disk_space() {
    local usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$usage" -lt 80 ]; then
        log_message "✅ Disk usage: ${usage}%"
        return 0
    else
        log_message "⚠️  High disk usage: ${usage}%"
        if [ "$usage" -gt 90 ]; then
            send_notification "Critical: Disk usage at ${usage}%"
        fi
        return 1
    fi
}

# Check memory usage
check_memory() {
    local usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ "$usage" -lt 80 ]; then
        log_message "✅ Memory usage: ${usage}%"
        return 0
    else
        log_message "⚠️  High memory usage: ${usage}%"
        if [ "$usage" -gt 90 ]; then
            send_notification "Critical: Memory usage at ${usage}%"
        fi
        return 1
    fi
}

# Check SSL certificate expiry
check_ssl_cert() {
    local expiry=$(echo | openssl s_client -servername kesaru.me -connect kesaru.me:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
    local expiry_epoch=$(date -d "$expiry" +%s)
    local current_epoch=$(date +%s)
    local days_left=$(( (expiry_epoch - current_epoch) / 86400 ))
    
    if [ "$days_left" -gt 30 ]; then
        log_message "✅ SSL certificate expires in $days_left days"
        return 0
    elif [ "$days_left" -gt 7 ]; then
        log_message "⚠️  SSL certificate expires in $days_left days"
        send_notification "SSL certificate expires in $days_left days - renewal needed soon"
        return 1
    else
        log_message "❌ SSL certificate expires in $days_left days - URGENT"
        send_notification "URGENT: SSL certificate expires in $days_left days!"
        return 1
    fi
}

# Main monitoring function
main() {
    log_message "Starting system health check..."
    
    local failures=0
    
    check_app_status || ((failures++))
    check_http_response || ((failures++))
    check_https_response || ((failures++))
    check_disk_space || ((failures++))
    check_memory || ((failures++))
    check_ssl_cert || ((failures++))
    
    if [ "$failures" -eq 0 ]; then
        log_message "✅ All health checks passed"
    else
        log_message "❌ $failures health check(s) failed"
    fi
    
    log_message "Health check completed"
    echo "---" >> "$LOG_FILE"
}

# Run the main function
main
