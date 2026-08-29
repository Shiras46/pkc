---
description: Deploy the project to the server at 72.61.251.245
---

# Deployment Workflow

This workflow will build the project and upload it to your server.

### Prerequisites
- SSH access to `root@72.61.251.245`
- Node.js and PM2 installed on the server

### Steps

1. **Build the project locally**
   ```powershell
   npm run build
   ```

2. **Prepare the deployment package**
   The `standalone` build creates a minimal production-ready folder. We need to include `public` and `static` assets as well.
   ```powershell
   # Create a temporary deployment directory
   New-Item -ItemType Directory -Path "./deploy" -Force
   Copy-Item -Path "./.next/standalone/*" -Destination "./deploy" -Recurse
   Copy-Item -Path "./public" -Destination "./deploy/public" -Recurse
   Copy-Item -Path "./.next/static" -Destination "./deploy/.next/static" -Recurse
   
   # Optional: Copy .env.local if needed (be careful with secrets)
   # Copy-Item -Path ".env.local" -Destination "./deploy/.env"
   ```

3. **Upload to the server**
   ```powershell
   # Use scp to upload the deploy folder
   scp -r ./deploy/* root@72.61.251.245:/var/www/pkc-web
   ```

4. **Start/Restart on the server**
   SSH into the server and run:
   ```bash
   cd /var/www/pkc-web
   pm2 start server.js --name "pkc-web" || pm2 restart "pkc-web"
   ```
