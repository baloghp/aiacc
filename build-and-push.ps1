# AI Act Compliance - Build and Push Script for Windows
# This script builds the Docker image and pushes it to Docker Hub

param(
    [Parameter(Mandatory = $true)]
    [string]$DockerHubUsername,
    
    [Parameter(Mandatory = $false)]
    [string]$Tag = "latest"
)

Write-Host "🚀 Starting build and push process..." -ForegroundColor Green

# Check if Docker is running
try {
    docker version | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
}
catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if logged in to Docker Hub
try {
    docker info | Select-String "Username" | Out-Null
    Write-Host "✅ Logged in to Docker Hub" -ForegroundColor Green
}
catch {
    Write-Host "❌ Not logged in to Docker Hub. Please run 'docker login' first." -ForegroundColor Red
    exit 1
}

# Build the image
Write-Host "🔨 Building Docker image..." -ForegroundColor Yellow
$imageName = "$DockerHubUsername/ai-act-compliance:$Tag"

$buildResult = docker build -t $imageName . 2>&1
$buildExitCode = $LASTEXITCODE

if ($buildExitCode -ne 0) {
    Write-Host "❌ Failed to build image" -ForegroundColor Red
    Write-Host "Build output:" -ForegroundColor Yellow
    Write-Host $buildResult -ForegroundColor Red
    exit 1
}

Write-Host "✅ Image built successfully" -ForegroundColor Green

# Clean up any existing containers BEFORE testing
Write-Host "🔍 Checking for existing containers..." -ForegroundColor Yellow

# Find containers using the same image
$existingContainers = docker ps -q --filter ancestor=$imageName
if ($existingContainers) {
    Write-Host "🛑 Stopping existing containers..." -ForegroundColor Yellow
    docker stop $existingContainers
    docker rm $existingContainers
    Write-Host "✅ Existing containers stopped and removed" -ForegroundColor Green
}

# Also check for any containers on port 3000
$port3000Containers = docker ps -q --filter publish=3000
if ($port3000Containers) {
    Write-Host "🛑 Stopping containers using port 3000..." -ForegroundColor Yellow
    docker stop $port3000Containers
    docker rm $port3000Containers
    Write-Host "✅ Port 3000 containers stopped and removed" -ForegroundColor Green
}

# Test the image locally
Write-Host "🧪 Testing image locally..." -ForegroundColor Yellow

$containerId = docker run -d -p 3000:3000 $imageName
$runExitCode = $LASTEXITCODE

if ($runExitCode -ne 0) {
    Write-Host "❌ Failed to start container" -ForegroundColor Red
    exit 1
}

Start-Sleep -Seconds 10

# Check if container is running
$running = docker ps --filter "id=$containerId" --format "table {{.Names}}"

if ($running) {
    Write-Host "✅ Container is running successfully" -ForegroundColor Green
    Write-Host "🌐 Application available at: http://localhost:3000" -ForegroundColor Cyan
}
else {
    Write-Host "❌ Container failed to start" -ForegroundColor Red
    Write-Host "Container logs:" -ForegroundColor Yellow
    docker logs $containerId
    docker stop $containerId 2>$null
    docker rm $containerId 2>$null
    exit 1
}

# Stop the test container
docker stop $containerId
docker rm $containerId

# Push to Docker Hub
Write-Host "📤 Pushing image to Docker Hub..." -ForegroundColor Yellow

$pushResult = docker push $imageName 2>&1
$pushExitCode = $LASTEXITCODE

if ($pushExitCode -ne 0) {
    Write-Host "❌ Failed to push image" -ForegroundColor Red
    Write-Host "Push output:" -ForegroundColor Yellow
    Write-Host $pushResult -ForegroundColor Red
    exit 1
}

Write-Host "✅ Image pushed successfully to Docker Hub" -ForegroundColor Green

Write-Host "🎉 Build and push completed successfully!" -ForegroundColor Green
Write-Host "📋 Image: $imageName" -ForegroundColor Cyan
Write-Host "📖 Next steps:" -ForegroundColor Yellow
Write-Host "   1. SSH to your VPS" -ForegroundColor White
Write-Host "   2. Update the IMAGE_NAME in deploy.sh to: $imageName" -ForegroundColor White
Write-Host "   3. Run: ./deploy.sh" -ForegroundColor White 