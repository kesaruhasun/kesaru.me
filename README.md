# Kesaru.me - Personal Portfolio Website

A modern, automated portfolio website built with Next.js and deployed on DigitalOcean with full CI/CD automation.

## 🚀 Features

- **Modern Stack**: Next.js 15 with TypeScript and Tailwind CSS
- **Automated Deployment**: GitHub Actions CI/CD pipeline
- **Production Ready**: Nginx reverse proxy with SSL/TLS
- **Monitoring**: Health checks and system monitoring
- **Backup System**: Automated daily backups
- **Security**: Firewall, fail2ban, and security headers
- **Docker Support**: Container deployment option
- **Infrastructure as Code**: Ansible automation

## 🔗 Live Site

Visit the live portfolio at: [https://kesaru.me](https://kesaru.me)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Deployment**: DigitalOcean Droplet, Nginx, PM2
- **CI/CD**: GitHub Actions
- **SSL**: Let's Encrypt with Certbot
- **Monitoring**: Custom health checks and system monitoring
- **Automation**: Ansible for server setup
- **Containerization**: Docker and Docker Compose

## 📚 Documentation

- **[Deployment Guide](DEPLOYMENT.md)** - Complete setup and deployment instructions
- **[API Documentation](app/api/health/route.ts)** - Health check endpoint details

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/kesaru.me.git
cd kesaru.me

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

## 📁 Project Structure

```
kesaru.me/
├── app/                    # Next.js app directory
├── ansible/               # Server automation
├── nginx/                 # Web server configuration
├── scripts/               # Monitoring and backup scripts
├── .github/workflows/     # CI/CD pipelines
└── docs/                  # Documentation
```

## 🔧 Configuration

### Environment Variables

```env
NODE_ENV=production
PORT=3000
```

### GitHub Secrets Required

- `DROPLET_HOST` - DigitalOcean droplet IP
- `DROPLET_USER` - SSH username
- `DROPLET_SSH_KEY` - SSH private key

## 📊 Monitoring

The application includes comprehensive monitoring:

- **Health Check**: `/api/health` endpoint
- **System Monitoring**: CPU, memory, disk usage
- **SSL Monitoring**: Certificate expiry tracking
- **Application Monitoring**: PM2 process management

## 🔐 Security

- UFW firewall configuration
- Fail2ban SSH protection
- SSL/TLS with strong ciphers
- Security headers (XSS, CSRF protection)
- Regular automated updates

## 🔄 CI/CD Pipeline

Automated deployment triggered on push to main:

1. Build Next.js application
2. Run tests
3. Deploy to DigitalOcean droplet
4. Health checks and rollback on failure

## 📈 Performance

- Optimized Next.js build
- Nginx with gzip compression
- HTTP/2 with SSL
- Static asset caching
- Docker container optimization

## 🆘 Support

For issues or questions:
- Check [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting section
- Open a GitHub issue
- Contact: hello@kesaru.me

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Kesaru**
