# Quick local test script for AI Act Compliance Docker container

param(
    [Parameter(Mandatory = $true)]
    [string]$DockerHubUsername,
    
    [Parameter(Mandatory = $false)]
    [string]$Tag = "latest"
)

$imageName = "$DockerHubUsername/ai-act-compliance:$Tag"

Write-Host "🧪 Testing Docker container locally..." -ForegroundColor Yellow

# Check if image exists
$imageExists = docker images --format "table {{.Repository}}:{{.Tag}}" | Select-String $imageName

if (-not $imageExists) {
    Write-Host "❌ Image not found. Building first..." -ForegroundColor Red
    $buildResult = docker build -t $imageName . 2>&1
    $buildExitCode = $LASTEXITCODE
    
    if ($buildExitCode -ne 0) {
        Write-Host "❌ Failed to build image" -ForegroundColor Red
        Write-Host "Build output:" -ForegroundColor Yellow
        Write-Host $buildResult -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Image built successfully" -ForegroundColor Green
}

# Check and stop any existing containers
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

# Run the container
Write-Host "🚀 Starting container..." -ForegroundColor Green
$containerId = docker run -d -p 3000:3000 $imageName

# Wait a moment for the app to start
Start-Sleep -Seconds 5

# Check if container is running
$running = docker ps --filter "id=$containerId" --format "table {{.Names}}"

if ($running) {
    Write-Host "✅ Container is running successfully!" -ForegroundColor Green
    Write-Host "🌐 Application available at: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "📋 Container ID: $containerId" -ForegroundColor White
    Write-Host ""
    Write-Host "Press any key to stop the container..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    # Stop and remove container
    docker stop $containerId
    docker rm $containerId
    Write-Host "🛑 Container stopped and removed." -ForegroundColor Green
}
else {
    Write-Host "❌ Container failed to start" -ForegroundColor Red
    Write-Host "📋 Container logs:" -ForegroundColor Yellow
    docker logs $containerId
} 