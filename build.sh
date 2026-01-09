#!/bin/bash

echo "Building Next.js application..."
npm run build

echo "Copying public folder to standalone build..."
cp -r public .next/standalone/public

echo "Copying static files to standalone build..."
cp -r .next/static .next/standalone/.next/static

echo "Build complete!"
