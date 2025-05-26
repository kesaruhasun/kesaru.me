#!/bin/bash

# Comprehensive Testing Script for kesaru.me
# Tests all aspects of the deployment including security, performance, and functionality

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="kesaru.me"
LOCAL_URL="http://localhost:3000"
PROD_URL="https://$DOMAIN"
TEST_RESULTS=()

# Function to print colored output
print_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

print_pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
    TEST_RESULTS+=("PASS: $1")
}

print_fail() {
    echo -e "${RED}[FAIL]${NC} $1"
    TEST_RESULTS+=("FAIL: $1")
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
    TEST_RESULTS+=("WARN: $1")
}

# Function to test HTTP response
test_http_response() {
    local url=$1
    local expected_code=$2
    local test_name=$3
    
    print_test "Testing $test_name: $url"
    
    local response_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
    
    if [ "$response_code" = "$expected_code" ]; then
        print_pass "$test_name - Status Code: $response_code"
        return 0
    else
        print_fail "$test_name - Expected: $expected_code, Got: $response_code"
        return 1
    fi
}

# Function to test HTTPS security
test_https_security() {
    print_test "Testing HTTPS security configuration"
    
    # Test SSL Labs score (simplified check)
    local ssl_test=$(echo | openssl s_client -connect $DOMAIN:443 -servername $DOMAIN 2>/dev/null | grep "Verify return code")
    
    if echo "$ssl_test" | grep -q "0 (ok)"; then
        print_pass "SSL certificate verification"
    else
        print_fail "SSL certificate verification failed"
    fi
    
    # Test security headers
    local headers=$(curl -s -I "$PROD_URL" || echo "")
    
    if echo "$headers" | grep -q "Strict-Transport-Security"; then
        print_pass "HSTS header present"
    else
        print_fail "HSTS header missing"
    fi
    
    if echo "$headers" | grep -q "X-Frame-Options"; then
        print_pass "X-Frame-Options header present"
    else
        print_fail "X-Frame-Options header missing"
    fi
    
    if echo "$headers" | grep -q "X-Content-Type-Options"; then
        print_pass "X-Content-Type-Options header present"
    else
        print_fail "X-Content-Type-Options header missing"
    fi
}

# Function to test performance
test_performance() {
    print_test "Testing website performance"
    
    # Test response time
    local response_time=$(curl -w "%{time_total}" -s -o /dev/null "$PROD_URL" || echo "0")
    local response_time_ms=$(echo "$response_time * 1000" | bc -l 2>/dev/null | cut -d. -f1 || echo "0")
    
    if [ "$response_time_ms" -lt 2000 ]; then
        print_pass "Response time: ${response_time_ms}ms (< 2000ms)"
    elif [ "$response_time_ms" -lt 5000 ]; then
        print_warning "Response time: ${response_time_ms}ms (acceptable but could be better)"
    else
        print_fail "Response time: ${response_time_ms}ms (> 5000ms - too slow)"
    fi
    
    # Test compression
    local content_encoding=$(curl -s -H "Accept-Encoding: gzip" -I "$PROD_URL" | grep -i "content-encoding" || echo "")
    
    if echo "$content_encoding" | grep -q "gzip"; then
        print_pass "Gzip compression enabled"
    else
        print_fail "Gzip compression not enabled"
    fi
}

# Function to test API endpoints
test_api_endpoints() {
    print_test "Testing API endpoints"
    
    # Test health endpoint locally
    if command -v curl >/dev/null 2>&1; then
        if curl -f "$LOCAL_URL/api/health" >/dev/null 2>&1; then
            print_pass "Local health endpoint responding"
        else
            print_warning "Local health endpoint not responding (app may not be running locally)"
        fi
    fi
    
    # Test health endpoint in production
    test_http_response "$PROD_URL/api/health" "200" "Production health endpoint"
    
    # Test health endpoint content
    local health_response=$(curl -s "$PROD_URL/api/health" || echo "{}")
    
    if echo "$health_response" | grep -q "healthy"; then
        print_pass "Health endpoint returns healthy status"
    else
        print_fail "Health endpoint does not return healthy status"
    fi
    
    if echo "$health_response" | grep -q "timestamp"; then
        print_pass "Health endpoint includes timestamp"
    else
        print_fail "Health endpoint missing timestamp"
    fi
}

# Function to test redirects
test_redirects() {
    print_test "Testing HTTP to HTTPS redirect"
    
    local redirect_response=$(curl -s -I "http://$DOMAIN" | head -n 1)
    
    if echo "$redirect_response" | grep -q "301\|302"; then
        print_pass "HTTP to HTTPS redirect working"
    else
        print_fail "HTTP to HTTPS redirect not working"
    fi
    
    # Test www redirect
    local www_redirect=$(curl -s -I "https://www.$DOMAIN" | head -n 1)
    
    if echo "$www_redirect" | grep -q "301\|302\|200"; then
        print_pass "WWW domain handling working"
    else
        print_fail "WWW domain handling not working"
    fi
}

# Function to test local build
test_local_build() {
    print_test "Testing local build process"
    
    if [ -f "package.json" ]; then
        print_pass "package.json found"
        
        if [ -d "node_modules" ]; then
            print_pass "node_modules directory exists"
        else
            print_warning "node_modules not found - run 'npm install'"
        fi
        
        if [ -f "next.config.ts" ]; then
            print_pass "Next.js configuration found"
        else
            print_fail "Next.js configuration missing"
        fi
        
        # Test if build directory exists
        if [ -d ".next" ]; then
            print_pass "Build directory exists"
        else
            print_warning "Build directory not found - run 'npm run build'"
        fi
    else
        print_fail "package.json not found"
    fi
}

# Function to test PM2 configuration
test_pm2_config() {
    print_test "Testing PM2 configuration"
    
    if [ -f "ecosystem.config.json" ]; then
        print_pass "PM2 ecosystem config found"
        
        # Validate JSON
        if command -v node >/dev/null 2>&1; then
            if node -e "JSON.parse(require('fs').readFileSync('ecosystem.config.json', 'utf8'))" 2>/dev/null; then
                print_pass "PM2 config is valid JSON"
            else
                print_fail "PM2 config has invalid JSON syntax"
            fi
        fi
    else
        print_fail "PM2 ecosystem config missing"
    fi
}

# Function to test Nginx configuration
test_nginx_config() {
    print_test "Testing Nginx configuration"
    
    if [ -f "nginx/kesaru.me.conf" ]; then
        print_pass "Nginx configuration file found"
        
        # Check for important directives
        local nginx_config=$(cat nginx/kesaru.me.conf)
        
        if echo "$nginx_config" | grep -q "ssl_certificate"; then
            print_pass "SSL configuration present"
        else
            print_fail "SSL configuration missing"
        fi
        
        if echo "$nginx_config" | grep -q "gzip on"; then
            print_pass "Gzip compression configured"
        else
            print_fail "Gzip compression not configured"
        fi
        
        if echo "$nginx_config" | grep -q "proxy_pass"; then
            print_pass "Reverse proxy configuration present"
        else
            print_fail "Reverse proxy configuration missing"
        fi
    else
        print_fail "Nginx configuration file missing"
    fi
}

# Function to test Docker configuration
test_docker_config() {
    print_test "Testing Docker configuration"
    
    if [ -f "Dockerfile" ]; then
        print_pass "Dockerfile found"
        
        # Check for multi-stage build
        if grep -q "FROM.*AS" Dockerfile; then
            print_pass "Multi-stage build configured"
        else
            print_warning "Single-stage build (multi-stage recommended for production)"
        fi
        
        # Check for non-root user
        if grep -q "USER" Dockerfile; then
            print_pass "Non-root user configured in Docker"
        else
            print_warning "Running as root in Docker (not recommended)"
        fi
    else
        print_warning "Dockerfile not found (optional)"
    fi
    
    if [ -f "docker-compose.yml" ]; then
        print_pass "Docker Compose configuration found"
    else
        print_warning "Docker Compose configuration not found (optional)"
    fi
    
    if [ -f ".dockerignore" ]; then
        print_pass ".dockerignore file found"
    else
        print_warning ".dockerignore file missing (recommended)"
    fi
}

# Function to test CI/CD configuration
test_cicd_config() {
    print_test "Testing CI/CD configuration"
    
    if [ -f ".github/workflows/deploy.yml" ]; then
        print_pass "GitHub Actions workflow found"
        
        # Check for required secrets
        local workflow_content=$(cat .github/workflows/deploy.yml)
        
        if echo "$workflow_content" | grep -q "DROPLET_HOST"; then
            print_pass "DROPLET_HOST secret referenced"
        else
            print_fail "DROPLET_HOST secret not found in workflow"
        fi
        
        if echo "$workflow_content" | grep -q "DROPLET_USER"; then
            print_pass "DROPLET_USER secret referenced"
        else
            print_fail "DROPLET_USER secret not found in workflow"
        fi
        
        if echo "$workflow_content" | grep -q "DROPLET_SSH_KEY"; then
            print_pass "DROPLET_SSH_KEY secret referenced"
        else
            print_fail "DROPLET_SSH_KEY secret not found in workflow"
        fi
    else
        print_fail "GitHub Actions workflow missing"
    fi
}

# Function to test monitoring scripts
test_monitoring_scripts() {
    print_test "Testing monitoring scripts"
    
    if [ -f "scripts/monitor.sh" ]; then
        print_pass "Monitoring script found"
        
        if [ -x "scripts/monitor.sh" ]; then
            print_pass "Monitoring script is executable"
        else
            print_fail "Monitoring script is not executable"
        fi
    else
        print_fail "Monitoring script missing"
    fi
    
    if [ -f "scripts/backup.sh" ]; then
        print_pass "Backup script found"
        
        if [ -x "scripts/backup.sh" ]; then
            print_pass "Backup script is executable"
        else
            print_fail "Backup script is not executable"
        fi
    else
        print_fail "Backup script missing"
    fi
}

# Function to test Ansible configuration
test_ansible_config() {
    print_test "Testing Ansible configuration"
    
    if [ -f "ansible/setup-server.yml" ]; then
        print_pass "Ansible playbook found"
    else
        print_fail "Ansible playbook missing"
    fi
    
    if [ -f "ansible/inventory" ]; then
        print_pass "Ansible inventory found"
    else
        print_fail "Ansible inventory missing"
    fi
}

# Function to run all tests
run_all_tests() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════╗"
    echo "║              Kesaru.me Test Suite                ║"
    echo "║           Comprehensive Testing Script           ║"
    echo "╚══════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    # Local tests
    echo -e "\n${YELLOW}=== LOCAL CONFIGURATION TESTS ===${NC}"
    test_local_build
    test_pm2_config
    test_nginx_config
    test_docker_config
    test_cicd_config
    test_monitoring_scripts
    test_ansible_config
    
    # Production tests (if domain is accessible)
    echo -e "\n${YELLOW}=== PRODUCTION TESTS ===${NC}"
    if curl -s --max-time 10 "$PROD_URL" >/dev/null 2>&1; then
        test_http_response "$PROD_URL" "200" "Homepage"
        test_api_endpoints
        test_https_security
        test_performance
        test_redirects
    else
        print_warning "Production site not accessible - skipping production tests"
        print_warning "Make sure $DOMAIN is properly configured and accessible"
    fi
}

# Function to display test summary
display_summary() {
    echo -e "\n${YELLOW}=== TEST SUMMARY ===${NC}"
    
    local total_tests=${#TEST_RESULTS[@]}
    local passed_tests=0
    local failed_tests=0
    local warning_tests=0
    
    for result in "${TEST_RESULTS[@]}"; do
        if [[ $result == PASS:* ]]; then
            ((passed_tests++))
        elif [[ $result == FAIL:* ]]; then
            ((failed_tests++))
        elif [[ $result == WARN:* ]]; then
            ((warning_tests++))
        fi
    done
    
    echo "Total Tests: $total_tests"
    print_pass "Passed: $passed_tests"
    print_fail "Failed: $failed_tests"
    print_warning "Warnings: $warning_tests"
    
    if [ $failed_tests -eq 0 ]; then
        echo -e "\n${GREEN}🎉 All critical tests passed!${NC}"
        if [ $warning_tests -gt 0 ]; then
            echo -e "${YELLOW}⚠️  There are $warning_tests warnings to review.${NC}"
        fi
    else
        echo -e "\n${RED}❌ $failed_tests test(s) failed. Please review and fix issues.${NC}"
    fi
}

# Main execution
main() {
    run_all_tests
    display_summary
    
    echo -e "\n${BLUE}For detailed deployment instructions, see DEPLOYMENT.md${NC}"
}

# Run the tests
main "$@"
