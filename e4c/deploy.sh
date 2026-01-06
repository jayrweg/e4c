#!/bin/bash

###############################################################################
# E4C Manual Deployment Script for Traditional Hosting
# This script builds the application and prepares it for upload to your server
###############################################################################

set -e  # Exit on error

echo "🚀 E4C Deployment Script"
echo "========================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BUILD_DIR="deploy-package"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="deploy-backups"

echo "📦 Step 1: Cleaning previous builds..."
rm -rf $BUILD_DIR
rm -rf .next
mkdir -p $BUILD_DIR
mkdir -p $BACKUP_DIR

echo ""
echo "📥 Step 2: Installing dependencies..."
npm ci --production=false

echo ""
echo "🔨 Step 3: Building Next.js application..."
npm run build

if [ ! -d ".next" ]; then
  echo -e "${RED}❌ Build failed! .next directory not found${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

echo ""
echo "📦 Step 4: Creating deployment package..."

# Copy built files
cp -r .next $BUILD_DIR/
cp -r public $BUILD_DIR/
cp package.json $BUILD_DIR/
cp package-lock.json $BUILD_DIR/
cp next.config.* $BUILD_DIR/ 2>/dev/null || true

# Copy environment file if exists
if [ -f ".env.production" ]; then
  cp .env.production $BUILD_DIR/
  echo "✅ Environment file copied"
else
  echo -e "${YELLOW}⚠️  No .env.production file found${NC}"
fi

echo ""
echo "📥 Step 5: Installing production dependencies..."
cd $BUILD_DIR
npm ci --production
cd ..

echo ""
echo "📝 Step 6: Creating server scripts..."

# Create start script
cat > $BUILD_DIR/start.sh << 'EOF'
#!/bin/bash

# E4C Start Script
export NODE_ENV=production
export PORT=${PORT:-3000}

echo "Starting E4C Website on port $PORT..."
node_modules/.bin/next start -p $PORT
EOF
chmod +x $BUILD_DIR/start.sh

# Create PM2 ecosystem file
cat > $BUILD_DIR/ecosystem.config.js << 'EOF'
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
EOF

# Create README for deployment
cat > $BUILD_DIR/DEPLOY-README.md << 'EOF'
# E4C Deployment Package

## What's Included
- `.next/` - Built Next.js application
- `public/` - Static assets
- `node_modules/` - Production dependencies
- `package.json` - Dependencies manifest
- `start.sh` - Simple start script
- `ecosystem.config.js` - PM2 configuration

## Deployment Steps

### 1. Upload to Server
Upload all files in this directory to your server (via FTP, SFTP, or SCP).

### 2. Start the Application

**Option A: Using PM2 (Recommended)**
```bash
# Install PM2 globally (one-time)
npm install -g pm2

# Start the application
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

**Option B: Using the start script**
```bash
chmod +x start.sh
./start.sh
```

**Option C: Direct command**
```bash
NODE_ENV=production node_modules/.bin/next start
```

## Environment Variables
Make sure these are set on your server:
- NEXT_PUBLIC_SANITY_PROJECT_ID
- NEXT_PUBLIC_SANITY_DATASET
- SANITY_API_TOKEN
- RESEND_API_KEY

## Port Configuration
By default, the app runs on port 3000.
Change it by setting the PORT environment variable:
```bash
export PORT=8080
pm2 restart e4c-website --update-env
```

## Troubleshooting
- Check PM2 logs: `pm2 logs e4c-website`
- Restart: `pm2 restart e4c-website`
- Stop: `pm2 stop e4c-website`
EOF

echo ""
echo "📦 Step 7: Creating compressed archive..."
cd $BUILD_DIR
tar -czf ../e4c-deploy-${TIMESTAMP}.tar.gz .
cd ..

echo ""
echo -e "${GREEN}✅ Deployment package created successfully!${NC}"
echo ""
echo "📦 Package location: $BUILD_DIR/"
echo "📦 Compressed archive: e4c-deploy-${TIMESTAMP}.tar.gz"
echo ""
echo "📋 Next Steps:"
echo "1. Upload the contents of '$BUILD_DIR/' to your server"
echo "   OR"
echo "   Upload 'e4c-deploy-${TIMESTAMP}.tar.gz' and extract it on the server"
echo ""
echo "2. On your server, run:"
echo "   npm install -g pm2"
echo "   pm2 start ecosystem.config.js"
echo ""
echo "3. Your site will be live on port 3000!"
echo ""
echo "📚 See $BUILD_DIR/DEPLOY-README.md for detailed instructions"
echo ""
