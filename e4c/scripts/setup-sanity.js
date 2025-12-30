#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Sanity CMS for EMPOWER FOR CHANGE...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  fs.copyFileSync(path.join(process.cwd(), 'env.example'), envPath);
  console.log('✅ .env.local created from env.example');
  console.log('⚠️  Please update the Sanity project ID and API token in .env.local\n');
}

console.log('📋 Next steps:');
console.log('1. Go to https://sanity.io/manage');
console.log('2. Create a new project called "EMPOWER FOR CHANGE"');
console.log('3. Copy the Project ID and update NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
console.log('4. Create an API token with Editor permissions and update SANITY_API_TOKEN in .env.local');
console.log('5. Run: npm run dev');
console.log('6. Visit http://localhost:3000/studio to access the CMS');
console.log('\n🎉 Sanity CMS setup complete!');
