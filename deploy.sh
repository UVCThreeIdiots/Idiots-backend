#!/bin/bash

# Example: Restarting a Node.js application
pm2 stop backend

# Pull the latest changes from the repository
git pull origin main

# Check if package.json has changed
if git diff --name-only HEAD@{1} HEAD | grep -q 'package.json'; then
  echo "package.json has changed, running npm install..."
  npm install
else
  echo "package.json has not changed, skipping npm install."
fi

# Restart the application
pm2 start backend

