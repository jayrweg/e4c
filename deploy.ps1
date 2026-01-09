# E4C Deployment Script for Windows PowerShell
# Builds the application and prepares it for upload to your server

Write-Host "🚀 E4C Deployment Script for Windows" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$BUILD_DIR = "deploy-package"
$TIMESTAMP = Get-Date -Format "yyyyMMdd_HHmmss"
$BACKUP_DIR = "deploy-backups"

Write-Host "📦 Step 1: Cleaning previous builds..." -ForegroundColor Yellow
if (Test-Path $BUILD_DIR) {
    Remove-Item -Recurse -Force $BUILD_DIR
}
if (Test-Path ".next") {
    Remove-Item -Recurse -Force .next
}
New-Item -ItemType Directory -Force -Path $BUILD_DIR | Out-Null
New-Item -ItemType Directory -Force -Path $BACKUP_DIR | Out-Null

Write-Host ""
Write-Host "📥 Step 2: Installing dependencies..." -ForegroundColor Yellow
npm ci --production=false
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔨 Step 3: Building Next.js application..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path ".next")) {
    Write-Host "❌ Build failed! .next directory not found" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Step 4: Creating deployment package..." -ForegroundColor Yellow

# Copy built files
Copy-Item -Recurse -Force ".next" "$BUILD_DIR\.next"
Copy-Item -Recurse -Force "public" "$BUILD_DIR\public"
Copy-Item -Force "package.json" "$BUILD_DIR\package.json"
Copy-Item -Force "package-lock.json" "$BUILD_DIR\package-lock.json"

# Copy next.config if exists
if (Test-Path "next.config.*") {
    Get-ChildItem "next.config.*" | Copy-Item -Destination $BUILD_DIR
}

# Copy environment file if exists
if (Test-Path ".env.production") {
    Copy-Item -Force ".env.production" "$BUILD_DIR\.env.production"
    Write-Host "✅ Environment file copied" -ForegroundColor Green
} else {
    Write-Host "⚠️  No .env.production file found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📥 Step 5: Installing production dependencies..." -ForegroundColor Yellow
Push-Location $BUILD_DIR
npm ci --production
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install production dependencies!" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location

Write-Host ""
Write-Host "📝 Step 6: Creating server scripts..." -ForegroundColor Yellow

# Create start script for Windows
@"
@echo off
set NODE_ENV=production
set PORT=3000
echo Starting E4C Website on port %PORT%...
node_modules\.bin\next start -p %PORT%
"@ | Out-File -FilePath "$BUILD_DIR\start.bat" -Encoding ASCII

# Create start script for Linux (in case deployed to Linux server)
@"
#!/bin/bash
export NODE_ENV=production
export PORT=`${PORT:-3000}
echo "Starting E4C Website on port `$PORT..."
node_modules/.bin/next start -p `$PORT
"@ | Out-File -FilePath "$BUILD_DIR\start.sh" -Encoding UTF8

# Create PM2 ecosystem file
@"
module.exports = {
  apps: [{
    name: 'e4c-website',
    script: './node_modules/.bin/next',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
"@ | Out-File -FilePath "$BUILD_DIR\ecosystem.config.js" -Encoding UTF8

# Create README
@"
# E4C Deployment Package

## What's Included
- .next/ - Built Next.js application
- public/ - Static assets
- node_modules/ - Production dependencies
- package.json - Dependencies manifest
- start.bat - Windows start script
- start.sh - Linux start script
- ecosystem.config.js - PM2 configuration

## Deployment Steps

### 1. Upload to Server
Upload all files in this directory to your server (via FTP, SFTP, or SCP).

### 2. Start the Application

**On Windows Server:**
``````
start.bat
``````

**On Linux Server with PM2:**
``````
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
``````

**On Linux Server without PM2:**
``````
chmod +x start.sh
./start.sh
``````

## Environment Variables
Make sure these are set on your server:
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- SANITY_API_TOKEN
- RESEND_API_KEY

## Port Configuration
By default, the app runs on port 3000.

## Troubleshooting
- Check if Node.js 20 is installed
- Verify environment variables are set
- Check if port 3000 is available
- View logs in the console
"@ | Out-File -FilePath "$BUILD_DIR\DEPLOY-README.md" -Encoding UTF8

Write-Host ""
Write-Host "📦 Step 7: Creating compressed archive..." -ForegroundColor Yellow

# Create ZIP archive
$zipFile = "e4c-deploy-$TIMESTAMP.zip"
if (Test-Path $zipFile) {
    Remove-Item -Force $zipFile
}

Compress-Archive -Path "$BUILD_DIR\*" -DestinationPath $zipFile

Write-Host ""
Write-Host "✅ Deployment package created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Package location: $BUILD_DIR\" -ForegroundColor Cyan
Write-Host "📦 Compressed archive: $zipFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Upload the contents of '$BUILD_DIR\' to your server" -ForegroundColor White
Write-Host "   OR" -ForegroundColor White
Write-Host "   Upload '$zipFile' and extract it on the server" -ForegroundColor White
Write-Host ""
Write-Host "2. On your server, run:" -ForegroundColor White
Write-Host "   npm install -g pm2" -ForegroundColor Gray
Write-Host "   pm2 start ecosystem.config.js" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Your site will be live on port 3000!" -ForegroundColor White
Write-Host ""
Write-Host "📚 See $BUILD_DIR\DEPLOY-README.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Deployment package ready!" -ForegroundColor Green
