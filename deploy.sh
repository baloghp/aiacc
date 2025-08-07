#!/bin/bash

# AI Act Compliance App Deployment Script
# This script should be run on your Ubuntu VPS

set -e

# Configuration
IMAGE_NAME="your-dockerhub-username/ai-act-compliance"
CONTAINER_NAME="ai-act-compliance"
PORT=3000

echo "🚀 Starting deployment of AI Act Compliance App..."

# Pull the latest image
echo "📥 Pulling latest Docker image..."
docker pull $IMAGE_NAME:latest

# Stop and remove existing container if it exists
echo "🛑 Stopping existing container..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Run the new container
echo "🏃 Starting new container..."
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p $PORT:3000 \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  $IMAGE_NAME:latest

# Wait a moment for the container to start
sleep 5

# Check if the container is running
if docker ps | grep -q $CONTAINER_NAME; then
    echo "✅ Container is running successfully!"
    echo "🌐 Application is available at: http://your-server-ip:$PORT"
else
    echo "❌ Container failed to start. Check logs with: docker logs $CONTAINER_NAME"
    exit 1
fi

# Show container logs
echo "📋 Recent container logs:"
docker logs --tail 20 $CONTAINER_NAME

echo "🎉 Deployment completed successfully!" 