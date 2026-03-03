# 🚀 Hostinger VPS Deployment Guide

## Lumicore Labs Portfolio (Vue.js 3 + Vite)

This guide will walk you through deploying the Lumicore Labs portfolio (Vue.js 3 frontend) as a static site on a Hostinger VPS using Nginx.

---

## 📋 Prerequisites

- Hostinger VPS with Ubuntu 22.04 installed
- SSH access to your VPS
- Your VPS IP address
- Domain name (optional, but recommended)
- Node.js and npm installed

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────┐
│         Hostinger VPS Server            │
│                                         │
│  ┌────────────────────────────────┐    │
│  │  Nginx (Web Server)            │    │
│  │  Port 80/443                   │    │
│  └──────────┬─────────────────────┘    │
│             │                           │
│  ┌──────────▼──────────┐               │
│  │  Vue.js 3 Frontend  │               │
│  │  (Static Files)     │               │
│  │  /dist              │               │
│  └─────────────────────┘               │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📦 Step 1: Connect to Your VPS

```bash
# Connect via SSH
ssh root@your_vps_ip

# Or if you have a username
ssh username@your_vps_ip
```

---

## 🔧 Step 2: Initial Server Setup

### 2.1 Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2 Install Required Tools

```bash
# Install Git
sudo apt install git -y

# Install Node.js and npm (if not already installed)
sudo apt install nodejs npm -y

# Install Nginx
sudo apt install nginx -y

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2.3 Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

---

## � Step 3: Deploy Your Application

### 3.1 Create Application Directory

```bash
# Create directory for your app
sudo mkdir -p /var/www/lumicore-labs-portfolio
cd /var/www/lumicore-labs-portfolio
```

### 3.2 Clone Your Repository

```bash
# If your code is on GitHub
sudo git clone https://github.com/MG4ACA/lumicore-labs-portfolio.git .

# Or upload your code using SCP from your local machine:
# scp -r /path/to/lumicore-labs-portfolio root@your_vps_ip:/var/www/lumicore-labs-portfolio
```

### 3.3 Set Correct Permissions

```bash
# Change ownership
sudo chown -R $USER:$USER /var/www/lumicore-labs-portfolio

# Set permissions
sudo chmod -R 755 /var/www/lumicore-labs-portfolio
```

---

## 🎨 Step 4: Build Frontend

### 4.1 Install Dependencies

```bash
cd /var/www/lumicore-labs-portfolio
npm install
```

### 4.2 Build for Production

```bash
# Build the Vue.js app
npm run build
```

This creates a `dist` folder with optimized static files.

### 4.3 Move Build to Nginx Directory

```bash
# Create directory for serving files
sudo mkdir -p /var/www/lumicore-labs

# Copy built files
sudo cp -r dist/* /var/www/lumicore-labs/

# Set permissions
sudo chown -R www-data:www-data /var/www/lumicore-labs
sudo chmod -R 755 /var/www/lumicore-labs
```

---

## 🌐 Step 5: Configure Nginx

### 5.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/lumicore-labs
```

Add this configuration:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name lumicore-labs.com www.lumicore-labs.com;

    # Shared root for all locations
    root /var/www/lumicore-labs;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Allow Certbot ACME challenges (must be before the /\. deny block)
    location ~ /\.well-known {
        allow all;
    }

    # Serve Vue.js app
    location / {
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header ETag "";
    }

    # Don't cache HTML
    location ~* \.html?$ {
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    # Hide sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Logs
    access_log /var/log/nginx/lumicore-labs-access.log;
    error_log /var/log/nginx/lumicore-labs-error.log;
}
```

### 5.2 Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/lumicore-labs /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx on boot
sudo systemctl enable nginx
```

---

## 🔒 Step 6: Set Up SSL (Optional but Recommended)

### 6.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 6.2 Obtain SSL Certificate

**Note:** You need a domain name pointed to your VPS IP for this step.

```bash
# Replace with your domain
sudo certbot --nginx -d lumicore-labs.com -d www.lumicore-labs.com
```

Certbot will:

- Obtain certificate
- Automatically configure Nginx
- Set up automatic renewal

### 6.3 Test Auto-Renewal

```bash
sudo certbot renew --dry-run
```

---

## ✅ Step 7: Verify Deployment

### 7.1 Check Nginx

```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/lumicore-labs-error.log

# Check if files are in place
ls -la /var/www/lumicore-labs
```

### 7.2 Test Application

Open your browser and visit:

- `http://your_vps_ip` (or `https://lumicore-labs.com`)

You should see your Lumicore Labs portfolio homepage!

---

## 🔄 Step 8: Deployment Script (For Updates)

Create a deployment script for easy updates:

```bash
sudo nano /var/www/lumicore-labs-portfolio/deploy.sh
```

```bash
#!/bin/bash

echo "🚀 Starting Lumicore Labs deployment..."

# Navigate to project directory
cd /var/www/lumicore-labs-portfolio

# Pull latest changes (if using Git)
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies and build
echo "🎨 Building frontend..."
npm install
npm run build

# Copy built files to Nginx
echo "📂 Copying files to web root..."
sudo cp -r dist/* /var/www/lumicore-labs/
sudo chown -R www-data:www-data /var/www/lumicore-labs

# Restart Nginx
echo "🌐 Restarting Nginx..."
sudo systemctl restart nginx

echo "✅ Deployment complete!"
```

Make it executable:

```bash
sudo chmod +x /var/www/lumicore-labs-portfolio/deploy.sh
```

Run deployment:

```bash
./deploy.sh
```

---

## 🛠️ Maintenance Commands

### Check Application Status

```bash
# Check Nginx status
sudo systemctl status nginx

# Check if site is accessible
curl http://your_vps_ip

# Check disk space
df -h

# Check memory usage
free -m
```

### View Logs

```bash
# Nginx access logs
sudo tail -f /var/log/nginx/lumicore-labs-access.log

# Nginx error logs
sudo tail -f /var/log/nginx/lumicore-labs-error.log
```

### Backup Portfolio Files

```bash
# Create backup directory
mkdir -p ~/backups

# Backup source code
tar -czf ~/backups/lumicore-labs-$(date +%Y%m%d_%H%M%S).tar.gz /var/www/lumicore-labs-portfolio

# Keep only last 7 days of backups
find ~/backups -name "lumicore-labs-*.tar.gz" -mtime +7 -delete
```

---

## 🐛 Troubleshooting

### Portfolio Not Loading

```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/lumicore-labs-error.log

# Verify files exist
ls -la /var/www/lumicore-labs

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 404 Errors on Routes

Make sure your Nginx config has `try_files $uri $uri/ /index.html;` to support Vue Router:

```bash
# Check configuration
sudo cat /etc/nginx/sites-available/lumicore-labs

# Reload Nginx
sudo systemctl reload nginx
```

### Pages Not Updating After Deployment

Clear browser cache or force a hard refresh (Ctrl+Shift+R). The site uses cache busting for static assets.

```bash
# Verify new files are in place
ls -la /var/www/lumicore-labs/index.html

# Check file permissions
sudo chown -R www-data:www-data /var/www/lumicore-labs
```

### High Memory or CPU Usage

```bash
# Check system resources
htop

# Check Nginx processes
ps aux | grep nginx
```

---

## 📊 Monitoring Setup (Optional)

### Install Monitoring Tools

```bash
# Install htop for resource monitoring
sudo apt install htop -y

# Monitor real-time
htop
```

---

## 🎯 Performance Optimization

### Enable Gzip Compression in Nginx

Edit `/etc/nginx/nginx.conf`:

```bash
sudo nano /etc/nginx/nginx.conf
```

Add inside `http` block:

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
```

Reload Nginx:

```bash
sudo systemctl reload nginx
```

---

## 📚 Additional Resources

- [Hostinger VPS Documentation](https://www.hostinger.com/tutorials/vps)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Certbot](https://certbot.eff.org/)
- [Vue.js 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vite.dev/)

---

## 📞 Support

If you encounter issues:

1. Check logs first (nginx logs, system logs)
2. Verify Nginx is running
3. Check firewall settings
4. Review configuration files
5. Restart Nginx: `sudo systemctl restart nginx`

---

## 🎉 Congratulations!

Your Lumicore Labs portfolio is now live on Hostinger VPS!

**Access your application at:**

- 🌐 Frontend: `http://your_vps_ip` or `https://lumicore-labs.com`

---

## 📝 Post-Deployment Checklist

- [ ] Repository cloned to `/var/www/lumicore-labs-portfolio`
- [ ] Dependencies installed (`npm install`)
- [ ] Build created (`npm run build`)
- [ ] Files copied to Nginx directory (`/var/www/lumicore-labs`)
- [ ] Nginx configuration created and enabled
- [ ] Site is accessible at your URL
- [ ] Firewall is configured (ports 22, 80, 443)
- [ ] SSL certificate installed (if using domain)
- [ ] Deployment script is ready for future updates

---

**Last Updated:** March 2026  
**Version:** 2.0.0  
**Project:** Lumicore Labs Portfolio
