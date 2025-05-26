#!/bin/bash

# Backup Script for kesaru.me
# This script creates automated backups of the application and logs

BACKUP_DIR="/var/backups/kesaru.me"
APP_DIR="/var/www/kesaru.me"
LOG_DIR="/var/log"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$BACKUP_DIR/backup.log"
}

# Function to create application backup
backup_application() {
    log_message "Starting application backup..."
    
    # Create application backup (excluding node_modules and .next)
    tar -czf "$BACKUP_DIR/app_backup_$DATE.tar.gz" \
        --exclude="$APP_DIR/node_modules" \
        --exclude="$APP_DIR/.next" \
        --exclude="$APP_DIR/.git" \
        -C "$(dirname "$APP_DIR")" \
        "$(basename "$APP_DIR")"
    
    if [ $? -eq 0 ]; then
        log_message "✅ Application backup completed: app_backup_$DATE.tar.gz"
    else
        log_message "❌ Application backup failed"
        return 1
    fi
}

# Function to backup logs
backup_logs() {
    log_message "Starting logs backup..."
    
    # Backup nginx logs
    tar -czf "$BACKUP_DIR/logs_backup_$DATE.tar.gz" \
        "$LOG_DIR/nginx/kesaru.me.access.log" \
        "$LOG_DIR/nginx/kesaru.me.error.log" \
        "$LOG_DIR/pm2/" \
        2>/dev/null
    
    if [ $? -eq 0 ]; then
        log_message "✅ Logs backup completed: logs_backup_$DATE.tar.gz"
    else
        log_message "⚠️  Some logs backup warnings (this is normal if some log files don't exist)"
    fi
}

# Function to backup database (if applicable in future)
backup_database() {
    # Placeholder for future database backups
    log_message "No database configured - skipping database backup"
}

# Function to clean old backups
cleanup_old_backups() {
    log_message "Cleaning up backups older than $RETENTION_DAYS days..."
    
    find "$BACKUP_DIR" -name "*.tar.gz" -type f -mtime +$RETENTION_DAYS -delete
    
    if [ $? -eq 0 ]; then
        log_message "✅ Old backup cleanup completed"
    else
        log_message "⚠️  Backup cleanup had some issues"
    fi
}

# Function to upload to DigitalOcean Spaces (optional)
upload_to_spaces() {
    # Uncomment and configure if you want to use DigitalOcean Spaces
    # Requires: s3cmd or aws cli configured for DigitalOcean Spaces
    
    # if command -v s3cmd >/dev/null 2>&1; then
    #     log_message "Uploading backup to DigitalOcean Spaces..."
    #     s3cmd put "$BACKUP_DIR/app_backup_$DATE.tar.gz" s3://your-space-name/backups/
    #     s3cmd put "$BACKUP_DIR/logs_backup_$DATE.tar.gz" s3://your-space-name/backups/
    #     log_message "✅ Backup uploaded to Spaces"
    # else
    #     log_message "s3cmd not found - skipping Spaces upload"
    # fi
    
    log_message "Spaces upload not configured - skipping"
}

# Function to send notification
send_notification() {
    local status=$1
    local webhook_url="$BACKUP_WEBHOOK_URL"  # Set this as environment variable
    
    if [ -n "$webhook_url" ]; then
        local message
        if [ "$status" = "success" ]; then
            message="✅ **kesaru.me Backup Completed**\nDate: $(date)\nLocation: $BACKUP_DIR"
        else
            message="❌ **kesaru.me Backup Failed**\nDate: $(date)\nCheck logs: $BACKUP_DIR/backup.log"
        fi
        
        curl -H "Content-Type: application/json" \
             -X POST \
             -d "{\"content\":\"$message\"}" \
             "$webhook_url" > /dev/null 2>&1
    fi
}

# Main backup function
main() {
    log_message "=== Starting backup process ==="
    
    local success=true
    
    backup_application || success=false
    backup_logs
    backup_database
    cleanup_old_backups
    upload_to_spaces
    
    if [ "$success" = true ]; then
        log_message "✅ Backup process completed successfully"
        send_notification "success"
    else
        log_message "❌ Backup process completed with errors"
        send_notification "failed"
        exit 1
    fi
    
    log_message "=== Backup process finished ==="
    echo "---" >> "$BACKUP_DIR/backup.log"
}

# Check if running as root or with appropriate permissions
if [ "$EUID" -ne 0 ] && [ "$(whoami)" != "kesaru" ]; then
    echo "This script should be run as root or kesaru user"
    exit 1
fi

# Run the main function
main
