# 🚀 Hostinger VPS Deployment Guide

## Lumicore Labs Portfolio (Vue.js Frontend Only)

This guide will walk you through deploying your Vue.js application on a Hostinger VPS (Ubuntu).

---

## 📋 Prerequisites

- Hostinger VPS with Ubuntu (e.g., 22.04) installed
- SSH access to your VPS
- Your VPS IP address
- Domain name pointed to your VPS IP (`lumicore-labs.com` and `www.lumicore-labs.com`)

---

## 🎯 Architecture Overview

```text
┌─────────────────────────────────────────┐
│         Hostinger VPS Server            │
│                                         │
│  ┌────────────────────────────────┐     │
│  │  Nginx (Web Server)            │     │
│  │  Ports 80/443                  │     │
│  └──────────┬─────────────────────┘     │
│             │                           │
│  ┌──────────▼──────────┐                │
│  │  Vue.js Frontend    │                │
│  │  (Static Files)     │                │
│  └─────────────────────┘                │
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

# Install Nginx
sudo apt install nginx -y

# Install Node.js and npm (for building the app)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
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

## 📥 Step 3: Deploy Your Application

### 3.1 Clone Your Repository

```bash
# Clone the frontend code to /var/www/
cd /var/www
sudo git clone https://github.com/MG4ACA/lumicore-labs-portfolio.git
cd lumicore-labs-portfolio
```

### 3.2 Install Dependencies and Build

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

The compiled static files will be located in the `dist` directory. Depending on your setup, you can either serve directly from `dist` (updating nginx root to `/var/www/lumicore-labs-portfolio/dist`) or copy its contents to the root directory.

### 3.3 Set Correct Permissions

```bash
# Change ownership to the web server user
sudo chown -R www-data:www-data /var/www/lumicore-labs-portfolio

# Set permissions
sudo chmod -R 755 /var/www/lumicore-labs-portfolio
```

---

## 🌐 Step 4: Configure Nginx

### 4.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/lumicore-labs
```

Add your Nginx configuration. Below is the configuration configured with SSL and HTTP-to-HTTPS redirect:

```nginx
server {
    server_name lumicore-labs.com www.lumicore-labs.com;

    # Note: Ensure this path points to your built files, 
    # e.g. /var/www/lumicore-labs-portfolio/dist if not moved to root
    root /var/www/lumicore-labs-portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    access_log /var/log/nginx/lumicore-labs-access.log;
    error_log /var/log/nginx/lumicore-labs-error.log;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/lumicore-labs.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/lumicore-labs.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = www.lumicore-labs.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    if ($host = lumicore-labs.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name lumicore-labs.com www.lumicore-labs.com;
    return 404; # managed by Certbot
}
```

### 4.2 Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/lumicore-labs /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 🔒 Step 5: Set Up SSL (If not already configured)

If you haven't already provisioned the SSL certificates using Certbot, follow these steps:

### 5.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 5.2 Obtain SSL Certificate

```bash
# Replace with your domain
sudo certbot --nginx -d lumicore-labs.com -d www.lumicore-labs.com
```

Certbot will automatically configure Nginx to use SSL and set up the redirection from HTTP to HTTPS, resulting in the Nginx configuration shown in Step 4.

---

## 🔄 Step 6: Deployment Script (For Updates)

Create a deployment script to easily pull the latest frontend changes and rebuild:

```bash
nano /var/www/lumicore-labs-portfolio/deploy.sh
```

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/lumicore-labs-portfolio

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Build frontend
echo "🎨 Deploying frontend..."
npm install
npm run build

echo "🌐 Restarting Nginx..."
sudo systemctl restart nginx

echo "✅ Deployment complete!"
```

Make it executable:

```bash
chmod +x /var/www/lumicore-labs-portfolio/deploy.sh
```

Run deployment:

```bash
./deploy.sh
```

---

## 🐛 Troubleshooting

### Frontend Not Loading

```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/lumicore-labs-error.log

# Verify files exist in the root directory
ls -la /var/www/lumicore-labs-portfolio

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### SSL Issues / Certbot Error

```bash
# Make sure your domain's DNS A records point to the VPS IP
# Test renewal
sudo certbot renew --dry-run
```

---

## 🎉 Congratulations!

Your Lumicore Labs Portfolio is now live!
**Access your application at:** `https://lumicore-labs.com`

---

## 📝 Post-Deployment Checklist

- [ ] Frontend is built and served by Nginx
- [ ] SPA routing works (refreshing on a subpage doesn't 404)
- [ ] SSL certificate is installed and active
- [ ] HTTP automatically redirects to HTTPS
- [ ] Firewall is configured
- [ ] Deployment script is ready
