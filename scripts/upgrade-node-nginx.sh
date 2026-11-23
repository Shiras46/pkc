#!/usr/bin/env bash
# ==============================================================================
# PKC Events - Server Upgrade Script (Node.js 22 LTS & Latest Nginx)
# Safe, idempotent upgrade for Ubuntu/Debian production servers
# ==============================================================================
set -euo pipefail

echo "=================================================="
echo " Starting Safe Upgrade: Node.js 22 LTS & Nginx"
echo "=================================================="

# 1. Update OS Package Lists
echo "--> Updating package lists..."
sudo apt-get update -y

# 2. Upgrade Nginx to Latest Available Stable
echo "--> Upgrading Nginx..."
sudo apt-get install -y --only-upgrade nginx || sudo apt-get install -y nginx

# Verify Nginx configuration before restarting
echo "--> Testing Nginx configuration..."
sudo nginx -t

echo "--> Reloading Nginx service gracefully..."
sudo systemctl reload nginx

# 3. Upgrade Node.js to v22.x LTS via NodeSource
echo "--> Configuring NodeSource repository for Node.js 22.x LTS..."
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

echo "--> Installing Node.js 22.x LTS..."
sudo apt-get install -y nodejs

# Verify versions
NODE_VER=$(node -v)
NPM_VER=$(npm -v)
NGINX_VER=$(nginx -v 2>&1)
echo "--> Upgraded Versions:"
echo "    Node:  $NODE_VER"
echo "    NPM:   $NPM_VER"
echo "    Nginx: $NGINX_VER"

# 4. Update PM2 globally and refresh PM2 daemon
echo "--> Updating PM2 globally..."
sudo npm install -g pm2@latest
echo "--> Refreshing in-memory PM2 daemon to adopt new Node.js runtime..."
pm2 update

# 5. Rebuild and restart application
APP_DIR="/var/www/pkc"
if [ -d "$APP_DIR" ]; then
    echo "--> Navigating to application directory ($APP_DIR)..."
    cd "$APP_DIR"
    
    echo "--> Rebuilding native modules (sharp, etc.) for Node $NODE_VER..."
    npm rebuild
    
    echo "--> Running Next.js production build..."
    npm run build
    
    echo "--> Restarting PM2 process (pkc-uat5)..."
    pm2 restart pkc-uat5 --update-env || pm2 restart all --update-env
    
    echo "--> Saving PM2 process list..."
    pm2 save
fi

echo "=================================================="
echo " Upgrade Complete! Node.js and Nginx are now on the latest versions."
echo "=================================================="
