# Kesaru.me Portfolio Deployment Guide

This repository contains the complete setup for deploying the kesaru.me portfolio website using Next.js with automated CI/CD deployment to DigitalOcean.

## 🚀 Quick Start

### Prerequisites
- DigitalOcean droplet (Ubuntu 20.04+ recommended)
- Domain name configured with Namecheap
- GitHub account
- Local development environment with Node.js 20+

### 1. Initial Server Setup

```bash
# Clone the repository
git clone https://github.com/your-username/kesaru.me.git
cd kesaru.me

# Run Ansible playbook to setup server
ansible-playbook -i ansible/inventory ansible/setup-server.yml
```

### 2. Configure GitHub Secrets

Add the following secrets to your GitHub repository:

- `DROPLET_HOST`: Your DigitalOcean droplet IP address
- `DROPLET_USER`: SSH username (kesaru)
- `DROPLET_SSH_KEY`: Private SSH key for server access

### 3. Deploy

Push to main branch to trigger automatic deployment:

```bash
git push origin main
```

## 📁 Project Structure

```
kesaru.me/
├── app/                    # Next.js app directory
│   ├── api/health/        # Health check endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── ansible/               # Server automation
│   ├── inventory          # Server inventory
│   └── setup-server.yml   # Playbook
├── nginx/                 # Web server config
│   └── kesaru.me.conf     # Nginx site config
├── scripts/               # Automation scripts
│   ├── monitor.sh         # Health monitoring
│   └── backup.sh          # Backup automation
├── .github/workflows/     # CI/CD pipelines
│   └── deploy.yml         # Deployment workflow
├── docker-compose.yml     # Docker orchestration
├── Dockerfile             # Container definition
├── ecosystem.config.json  # PM2 configuration
└── package.json           # Node.js dependencies
```

## 🔧 Configuration Details

### Environment Variables

Create a `.env.local` file for local development:

```env
NODE_ENV=development
```

Production environment variables are configured in:
- `ecosystem.config.json` for PM2
- GitHub Actions workflow
- Ansible playbook

### SSL Certificates

SSL certificates are automatically obtained and renewed using Let's Encrypt:
- Initial setup: Ansible playbook runs Certbot
- Auto-renewal: Cron job runs daily at noon
- Monitoring: Health check script verifies certificate expiry

### Monitoring

The monitoring system includes:
- **Health Check API**: `/api/health` endpoint
- **System Monitor**: Runs every 5 minutes via cron
- **Application Monitor**: PM2 process monitoring
- **SSL Monitor**: Certificate expiry tracking
- **Resource Monitor**: CPU, memory, disk usage

### Backup System

Automated backups include:
- **Application Code**: Daily backup excluding node_modules
- **Logs**: Nginx and PM2 logs
- **Retention**: 30-day automatic cleanup
- **Storage**: Local storage with optional cloud upload

## 🛠️ Manual Operations

### Starting/Stopping Services

```bash
# PM2 application management
pm2 start ecosystem.config.json
pm2 stop kesaru-portfolio
pm2 restart kesaru-portfolio
pm2 logs kesaru-portfolio

# Nginx management
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl reload nginx
sudo nginx -t  # Test configuration

# System monitoring
sudo /opt/kesaru/monitor.sh

# Manual backup
sudo /opt/kesaru/backup.sh
```

### Docker Deployment (Alternative)

```bash
# Build and run with Docker
docker-compose up -d

# View logs
docker-compose logs -f

# Update deployment
docker-compose pull && docker-compose up -d
```

### Debugging

```bash
# Check application logs
pm2 logs kesaru-portfolio

# Check Nginx logs
sudo tail -f /var/log/nginx/kesaru.me.access.log
sudo tail -f /var/log/nginx/kesaru.me.error.log

# Check system resources
htop
df -h
free -h

# Check SSL certificate
openssl x509 -in /etc/letsencrypt/live/kesaru.me/fullchain.pem -text -noout
```

## 🔐 Security Features

- **Firewall**: UFW configured for ports 22, 80, 443
- **Fail2ban**: SSH brute force protection
- **SSL/TLS**: Strong cipher configuration
- **Security Headers**: XSS, CSRF, clickjacking protection
- **Regular Updates**: Automated security patches
- **Non-root Deployment**: Application runs as dedicated user

## 🚨 Monitoring & Alerts

### Health Check Endpoints

- `https://kesaru.me/api/health` - Application health status
- Returns JSON with system metrics and status

### Notification Setup (Optional)

Configure Discord/Slack webhooks by setting environment variables:
- `DISCORD_WEBHOOK_URL` - For monitoring alerts
- `BACKUP_WEBHOOK_URL` - For backup notifications

## 📊 Performance Optimization

- **Next.js**: Optimized build with standalone output
- **Nginx**: Gzip compression and caching headers
- **SSL**: HTTP/2 enabled with HSTS
- **PM2**: Process management with clustering support
- **CDN Ready**: Configured for easy CDN integration

## 🔄 CI/CD Pipeline

The GitHub Actions workflow:
1. **Trigger**: Push to main branch
2. **Build**: Install dependencies and build Next.js app
3. **Test**: Run tests if available
4. **Deploy**: SSH to server and update application
5. **Verify**: Health checks and rollback on failure
6. **Notify**: Success/failure notifications

## 📈 Scaling Considerations

Current setup supports:
- **Traffic**: Medium traffic loads with PM2 clustering
- **Uptime**: 99.9% with health monitoring and auto-restart
- **Backup**: 30-day retention with automated cleanup
- **Security**: Production-ready security configuration

For high-traffic scenarios, consider:
- Load balancer with multiple droplets
- Database clustering
- CDN integration
- Container orchestration (Kubernetes)

## 🆘 Troubleshooting

### Common Issues

1. **Application won't start**
   ```bash
   cd /var/www/kesaru.me
   npm install
   npm run build
   pm2 restart kesaru-portfolio
   ```

2. **SSL certificate issues**
   ```bash
   sudo certbot renew --dry-run
   sudo systemctl reload nginx
   ```

3. **High resource usage**
   ```bash
   pm2 restart kesaru-portfolio
   sudo systemctl restart nginx
   ```

4. **Domain not resolving**
   - Check DNS settings in Namecheap
   - Verify A record points to correct IP
   - Clear DNS cache

### Log Locations

- Application: `/var/log/pm2/`
- Nginx: `/var/log/nginx/`
- Monitoring: `/var/log/kesaru-monitor.log`
- Backup: `/var/backups/kesaru.me/backup.log`

## 📝 Maintenance

### Regular Tasks

- **Weekly**: Review monitoring logs
- **Monthly**: Check disk space and clean old logs
- **Quarterly**: Update dependencies and security patches
- **Annually**: Review and update SSL configuration

### Updates

```bash
# Update application
git pull origin main
npm ci
npm run build
pm2 restart kesaru-portfolio

# Update system packages
sudo apt update && sudo apt upgrade -y
sudo systemctl reboot
```

## 📞 Support

For issues or questions:
- Check the GitHub Issues
- Review monitoring logs
- Consult the troubleshooting section
- Contact: hello@kesaru.me

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Maintainer**: Kesaru
