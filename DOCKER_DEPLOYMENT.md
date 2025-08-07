# Docker Deployment Guide for AI Act Compliance App

This guide will help you containerize your Next.js application and deploy it to your VPS using Docker.

## Prerequisites

- Docker Desktop installed on Windows
- Docker Hub account
- Ubuntu VPS with Docker installed
- SSH access to your VPS

## Step 1: Docker Hub Authentication

### On Windows (Development Machine)

1. **Install Docker Desktop** (if not already installed):
   - Download from: https://www.docker.com/products/docker-desktop/
   - Install and restart your computer

2. **Login to Docker Hub**:
   ```powershell
   docker login
   ```
   Enter your Docker Hub username and password when prompted.

### On Ubuntu VPS

1. **Install Docker** (if not already installed):
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo usermod -aG docker $USER
   # Log out and log back in for group changes to take effect
   ```

2. **Login to Docker Hub**:
   ```bash
   docker login
   ```

## Step 2: Build and Push Docker Image

### On Windows (Development Machine)

1. **Navigate to your project directory**:
   ```powershell
   cd ai-act-compliance
   ```

2. **Build the Docker image**:
   ```powershell
   docker build -t your-dockerhub-username/ai-act-compliance:latest .
   ```

3. **Test the image locally**:
   ```powershell
   docker run -p 3000:3000 your-dockerhub-username/ai-act-compliance:latest
   ```
   Visit `http://localhost:3000` to verify the app works.

4. **Push to Docker Hub**:
   ```powershell
   docker push your-dockerhub-username/ai-act-compliance:latest
   ```

**Note**: This simplified Dockerfile uses npm instead of yarn and doesn't require any special package managers.

## Step 3: Deploy to VPS

### On Ubuntu VPS

1. **SSH into your VPS**:
   ```bash
   ssh username@your-server-ip
   ```

2. **Create deployment directory**:
   ```bash
   mkdir -p ~/ai-act-compliance
   cd ~/ai-act-compliance
   ```

3. **Copy the deployment script**:
   ```bash
   # Upload deploy.sh from your local machine to VPS
   # You can use scp or copy-paste the content
   ```

4. **Make the script executable**:
   ```bash
   chmod +x deploy.sh
   ```

5. **Edit the deployment script**:
   ```bash
   nano deploy.sh
   ```
   Replace `your-dockerhub-username` with your actual Docker Hub username.

6. **Run the deployment**:
   ```bash
   ./deploy.sh
   ```

## Step 4: Configure Nginx (Optional but Recommended)

For production use, you should set up Nginx as a reverse proxy:

1. **Install Nginx**:
   ```bash
   sudo apt install nginx
   ```

2. **Create Nginx configuration**:
   ```bash
   sudo nano /etc/nginx/sites-available/ai-act-compliance
   ```

3. **Add the following configuration**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable the site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/ai-act-compliance /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Step 5: SSL Certificate (Optional but Recommended)

For HTTPS, install Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Useful Commands

### On Windows (Development)

```powershell
# Build image
docker build -t your-dockerhub-username/ai-act-compliance:latest .

# Test locally
docker run -p 3000:3000 your-dockerhub-username/ai-act-compliance:latest

# Push to Docker Hub
docker push your-dockerhub-username/ai-act-compliance:latest

# View logs
docker logs container-name

# Stop container
docker stop container-name
```

### On Ubuntu VPS

```bash
# View running containers
docker ps

# View logs
docker logs ai-act-compliance

# Stop container
docker stop ai-act-compliance

# Remove container
docker rm ai-act-compliance

# Update and redeploy
./deploy.sh

# View system resources
docker stats
```

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   sudo netstat -tulpn | grep :3000
   sudo kill -9 <PID>
   ```

2. **Permission denied**:
   ```bash
   sudo usermod -aG docker $USER
   # Log out and log back in
   ```

3. **Container won't start**:
   ```bash
   docker logs ai-act-compliance
   ```

4. **Image pull fails**:
   ```bash
   docker login
   docker pull your-dockerhub-username/ai-act-compliance:latest
   ```

### Health Check

The application includes a health check endpoint at `/api/health`. You can monitor it:

```bash
curl http://localhost:3000/api/health
```

## Security Considerations

1. **Firewall**: Configure your VPS firewall to only allow necessary ports
2. **Docker Security**: Run containers as non-root user (already configured)
3. **Regular Updates**: Keep Docker and your application updated
4. **Backup**: Regularly backup your application data

## Monitoring

Consider setting up monitoring tools like:
- Docker stats
- System monitoring (htop, iotop)
- Application monitoring (PM2, New Relic)

## Next Steps

1. Set up automatic deployments with GitHub Actions
2. Configure monitoring and alerting
3. Set up backup strategies
4. Implement CI/CD pipeline 