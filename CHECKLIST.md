# 🚀 Deployment Checklist for kesaru.me

Use this checklist to ensure a smooth deployment process.

## ✅ Pre-Deployment Checklist

### 🔧 Local Development
- [ ] Code is working locally (`npm run dev`)
- [ ] All tests pass (`./test.sh`)
- [ ] Build completes successfully (`npm run build`)
- [ ] TypeScript compilation passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Environment variables are configured
- [ ] All dependencies are up to date

### 🌐 Domain & DNS
- [ ] Domain purchased and configured (kesaru.me)
- [ ] DNS A record points to DigitalOcean droplet IP
- [ ] WWW subdomain configured (optional)
- [ ] DNS propagation completed (use `dig kesaru.me`)

### 🖥️ Server Setup
- [ ] DigitalOcean droplet created and accessible
- [ ] SSH access configured
- [ ] Server hardened (firewall, fail2ban)
- [ ] Required packages installed (Node.js, Nginx, PM2, etc.)
- [ ] Non-root user created for deployment
- [ ] SSL certificate obtained and configured

### 🔐 Security
- [ ] SSH keys generated and configured
- [ ] Firewall rules configured (ports 22, 80, 443)
- [ ] Fail2ban configured for SSH protection
- [ ] SSL/TLS certificate installed
- [ ] Security headers configured in Nginx
- [ ] Environment secrets secured

### 📦 GitHub Configuration
- [ ] Repository created and code pushed
- [ ] GitHub secrets configured:
  - [ ] `DROPLET_HOST` (server IP address)
  - [ ] `DROPLET_USER` (deployment username)
  - [ ] `DROPLET_SSH_KEY` (private SSH key)
- [ ] GitHub Actions workflow tested

## 🚀 Deployment Steps

### 1. Initial Server Setup
```bash
# Run Ansible playbook
ansible-playbook -i ansible/inventory ansible/setup-server.yml

# Or run manual setup script
sudo ./setup.sh
```

### 2. Manual Configuration (if not using Ansible)
```bash
# Copy Nginx configuration
sudo cp nginx/kesaru.me.conf /etc/nginx/sites-available/kesaru.me
sudo ln -s /etc/nginx/sites-available/kesaru.me /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Obtain SSL certificate
sudo certbot --nginx -d kesaru.me -d www.kesaru.me

# Setup monitoring
sudo cp scripts/*.sh /opt/kesaru/
sudo chmod +x /opt/kesaru/*.sh

# Setup cron jobs
sudo crontab -e
# Add: */5 * * * * /opt/kesaru/monitor.sh
# Add: 0 2 * * * /opt/kesaru/backup.sh
```

### 3. Deploy Application
```bash
# Push to main branch to trigger CI/CD
git push origin main

# Or deploy manually
cd /var/www/kesaru.me
git pull origin main
npm ci --only=production
npm run build
pm2 restart kesaru-portfolio
```

## ✅ Post-Deployment Checklist

### 🔍 Verification
- [ ] Website loads at https://kesaru.me
- [ ] HTTPS redirect works (http://kesaru.me → https://kesaru.me)
- [ ] SSL certificate is valid and trusted
- [ ] Health check endpoint works (`/api/health`)
- [ ] All pages load correctly
- [ ] Performance is acceptable (< 3s load time)

### 📊 Monitoring
- [ ] PM2 process is running (`pm2 status`)
- [ ] Nginx is running (`sudo systemctl status nginx`)
- [ ] Monitoring script is working (`sudo /opt/kesaru/monitor.sh`)
- [ ] Logs are being written correctly
- [ ] Backup script is configured (`sudo /opt/kesaru/backup.sh`)

### 🔒 Security Verification
- [ ] Firewall is active (`sudo ufw status`)
- [ ] Fail2ban is running (`sudo systemctl status fail2ban`)
- [ ] SSL Labs test passes (A+ rating)
- [ ] Security headers are present
- [ ] No sensitive information exposed

### 📈 Performance
- [ ] Website loads quickly (< 3 seconds)
- [ ] Images are optimized
- [ ] Gzip compression is working
- [ ] Caching headers are set correctly
- [ ] Mobile performance is good

## 🔧 Troubleshooting

### Common Issues

**Application won't start:**
```bash
cd /var/www/kesaru.me
npm install
npm run build
pm2 restart kesaru-portfolio
pm2 logs kesaru-portfolio
```

**Nginx errors:**
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

**SSL certificate issues:**
```bash
sudo certbot certificates
sudo certbot renew --dry-run
sudo systemctl reload nginx
```

**Domain not resolving:**
```bash
dig kesaru.me
nslookup kesaru.me
# Check DNS settings in domain registrar
```

## 📞 Final Steps

### 🎯 Go Live
- [ ] Announce the launch
- [ ] Submit to search engines
- [ ] Update social media profiles
- [ ] Add to professional networks
- [ ] Monitor for the first 24-48 hours

### 📚 Documentation
- [ ] Document any custom configurations
- [ ] Update README with live URLs
- [ ] Note any lessons learned
- [ ] Plan for future updates

### 🔄 Maintenance
- [ ] Schedule regular backups
- [ ] Plan security updates
- [ ] Monitor uptime and performance
- [ ] Plan content updates

---

## 🎉 Congratulations!

If you've checked off all items above, your kesaru.me portfolio is successfully deployed and ready for production use!

### Next Steps:
1. Monitor the site for the first week
2. Optimize based on real-world performance
3. Add new content and features
4. Plan for scaling if needed

### Support:
- Check logs: `/var/log/nginx/` and `/var/log/pm2/`
- Run health checks: `./test.sh`
- Monitor system: `/opt/kesaru/monitor.sh`
- Review documentation: `DEPLOYMENT.md`

**Happy coding! 🚀**
