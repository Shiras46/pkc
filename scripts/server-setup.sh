#!/bin/bash

# Update system
apt update && apt upgrade -y

# Install Node.js (Latest Active LTS - v22.x)
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx (Latest Stable)
apt install -y nginx

# Setup Firewall
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw --force enable

# Create app directory
mkdir -p /var/www/pkc
chown -R $USER:$USER /var/www/pkc

echo "Server setup complete! You can now deploy your application."
