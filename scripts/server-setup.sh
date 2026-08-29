#!/bin/bash

# Update system
apt update && apt upgrade -y

# Install Node.js (Latest LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt install -y nginx

# Setup Firewall
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

# Create app directory
mkdir -p /var/www/pkc-web
chown -R $USER:$USER /var/www/pkc-web

echo "Server setup complete! You can now deploy your application."
