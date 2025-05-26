#!/bin/bash

# Kesaru.me Portfolio Setup Script
# This script helps set up the portfolio website on a fresh DigitalOcean droplet

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="kesaru.me"
APP_USER="kesaru"
APP_DIR="/var/www/$DOMAIN"
REPO_URL="https://github.com/your-username/kesaru.me.git"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if script is run as root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        print_error "This script must be run as root"
        echo "Please run: sudo $0"
        exit 1
    fi
}

# Function to update system
update_system() {
    print_status "Updating system packages..."
    apt update && apt upgrade -y
    print_success "System updated successfully"
}

# Function to install required packages
install_packages() {
    print_status "Installing required packages..."
    
    local packages=(
        "curl"
        "wget"
        "git"
        "ufw"
        "fail2ban"
        "nginx"
        "certbot"
        "python3-certbot-nginx"
        "htop"
        "vim"
        "unzip"
        "build-essential"
    )
    
    apt install -y "${packages[@]}"
    print_success "Required packages installed"
}

# Function to install Node.js
install_nodejs() {
    print_status "Installing Node.js 20..."
    
    if ! command_exists node; then
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt install -y nodejs
    fi
    
    # Install PM2
    npm install -g pm2
    
    print_success "Node.js and PM2 installed"
    node --version
    npm --version
}

# Function to create application user
create_user() {
    print_status "Creating application user: $APP_USER"
    
    if ! id "$APP_USER" &>/dev/null; then
        useradd -m -s /bin/bash -G sudo "$APP_USER"
        print_success "User $APP_USER created"
    else
        print_warning "User $APP_USER already exists"
    fi
}

# Function to setup SSH key
setup_ssh() {
    print_status "Setting up SSH key for $APP_USER..."
    
    local ssh_dir="/home/$APP_USER/.ssh"
    
    if [ ! -d "$ssh_dir" ]; then
        mkdir -p "$ssh_dir"
        chown "$APP_USER:$APP_USER" "$ssh_dir"
        chmod 700 "$ssh_dir"
    fi
    
    print_warning "Please add your SSH public key to: $ssh_dir/authorized_keys"
    print_warning "You can do this manually or use: ssh-copy-id $APP_USER@your-server-ip"
}

# Function to configure firewall
setup_firewall() {
    print_status "Configuring UFW firewall..."
    
    ufw --force reset
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    
    print_success "Firewall configured"
}

# Function to configure fail2ban
setup_fail2ban() {
    print_status "Configuring fail2ban..."
    
    cat > /etc/fail2ban/jail.local << EOF
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
EOF
    
    systemctl enable fail2ban
    systemctl restart fail2ban
    
    print_success "Fail2ban configured"
}

# Function to setup application directory
setup_app_directory() {
    print_status "Setting up application directory..."
    
    mkdir -p "$APP_DIR"
    chown "$APP_USER:$APP_USER" "$APP_DIR"
    
    print_success "Application directory created: $APP_DIR"
}

# Function to clone repository
clone_repository() {
    print_status "Cloning repository..."
    
    if [ -d "$APP_DIR/.git" ]; then
        print_warning "Repository already exists, pulling latest changes..."
        cd "$APP_DIR"
        sudo -u "$APP_USER" git pull origin main
    else
        print_warning "Please clone your repository manually:"
        echo "sudo -u $APP_USER git clone $REPO_URL $APP_DIR"
    fi
}

# Function to setup Nginx
setup_nginx() {
    print_status "Configuring Nginx..."
    
    # Remove default site
    rm -f /etc/nginx/sites-enabled/default
    
    print_warning "Please copy your Nginx configuration from nginx/kesaru.me.conf"
    print_warning "to /etc/nginx/sites-available/$DOMAIN"
    print_warning "Then run: ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
    
    systemctl enable nginx
    print_success "Nginx configured"
}

# Function to setup SSL
setup_ssl() {
    print_status "Setting up SSL with Let's Encrypt..."
    
    print_warning "Please run the following command after configuring Nginx:"
    echo "certbot --nginx --non-interactive --agree-tos --email hello@$DOMAIN --domains $DOMAIN,www.$DOMAIN"
    
    # Setup auto-renewal
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx") | crontab -
    
    print_success "SSL auto-renewal configured"
}

# Function to setup monitoring
setup_monitoring() {
    print_status "Setting up monitoring..."
    
    mkdir -p /opt/kesaru
    mkdir -p /var/backups/kesaru.me
    mkdir -p /var/log/pm2
    
    chown "$APP_USER:$APP_USER" /var/log/pm2
    
    print_warning "Please copy monitoring and backup scripts to /opt/kesaru/"
    print_warning "Then setup cron jobs for monitoring and backups"
    
    print_success "Monitoring directories created"
}

# Function to install Docker (optional)
install_docker() {
    print_status "Installing Docker (optional)..."
    
    if ! command_exists docker; then
        apt install -y docker.io docker-compose
        systemctl enable docker
        systemctl start docker
        usermod -aG docker "$APP_USER"
        print_success "Docker installed"
    else
        print_warning "Docker already installed"
    fi
}

# Function to setup PM2
setup_pm2() {
    print_status "Setting up PM2..."
    
    sudo -u "$APP_USER" pm2 startup systemd
    print_warning "Please run the command shown above to complete PM2 setup"
    
    print_success "PM2 configured"
}

# Function to display next steps
show_next_steps() {
    print_success "Server setup completed!"
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "1. Add your SSH public key to /home/$APP_USER/.ssh/authorized_keys"
    echo "2. Clone your repository to $APP_DIR"
    echo "3. Copy Nginx configuration and enable the site"
    echo "4. Run certbot to obtain SSL certificate"
    echo "5. Copy monitoring scripts and setup cron jobs"
    echo "6. Install Node.js dependencies and build the application"
    echo "7. Start the application with PM2"
    echo "8. Configure GitHub Actions secrets:"
    echo "   - DROPLET_HOST: $(curl -s ifconfig.me)"
    echo "   - DROPLET_USER: $APP_USER"
    echo "   - DROPLET_SSH_KEY: (your private SSH key)"
    echo ""
    echo "For detailed instructions, see DEPLOYMENT.md"
}

# Main function
main() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════╗"
    echo "║            Kesaru.me Portfolio Setup             ║"
    echo "║         DigitalOcean Droplet Configuration       ║"
    echo "╚══════════════════════════════════════════════════╝"
    echo -e "${NC}"
    
    check_root
    
    print_status "Starting server setup for $DOMAIN..."
    
    update_system
    install_packages
    install_nodejs
    create_user
    setup_ssh
    setup_firewall
    setup_fail2ban
    setup_app_directory
    clone_repository
    setup_nginx
    setup_ssl
    setup_monitoring
    install_docker
    setup_pm2
    
    show_next_steps
}

# Run main function
main "$@"
