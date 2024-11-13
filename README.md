# <img src="icons/trackly.png" alt="Trackly Logo" width="32" height="32" style="vertical-align: middle"> Trackly

> Track your favorite artists' new releases with Discord notifications

Trackly is a Docker container that monitors your music library and notifies you about new releases from your favorite artists via Discord webhooks. The application scans a specified music directory for artist folders and tracks new releases using the MusicBrainz API.

## ✨ Features

- 📁 **Smart Directory Monitoring** - Watches your local music directory for artist folders
- 🎵 **Release Tracking** - Tracks new album releases from your artists using MusicBrainz API
- 🔔 **Discord Integration** - Sends beautiful Discord notifications for new releases
- 🤖 **Automated Updates** - Automatic periodic checks based on your schedule
- 🔄 **Real-time Updates** - Instant updates when new artists are added to the music folder
- 🚦 **Smart Rate Limiting** - Respects MusicBrainz API rate limits with exponential backoff
- 🎯 **Year-Specific Tracking** - Only tracks releases from the current year
- 🔒 **Thread-Safe Operations** - Prevents race conditions in file operations
- 💾 **Efficient Caching** - Reduces file I/O with smart JSON caching
- 🧹 **Automatic Cleanup** - Annual cleanup of old notifications
- 🛡️ **Enhanced Error Handling** - Robust error recovery and retry mechanisms

## 📋 Prerequisites

- Docker and Docker Compose installed on your system
- A Discord webhook URL for notifications
- A local music directory organized by artist folders

## 📁 Directory Structure

Your music directory should be organized with one folder per artist:

```
Music/
├── Artist1/
├── Artist2/
├── Artist3/
└── ...
```

## 🚀 Quick Start with Docker Hub

The easiest way to get started is using the pre-built Docker image:

```bash
# Pull the latest image
docker pull yourusername/trackly:latest

# Create your .env file
cp .env.example .env
nano .env  # Edit with your settings

# Run with docker-compose
docker-compose up -d
```

## ⚙️ Environment Variables

Create a `.env` file with the following variables:

```env
MUSIC_PATH=/path/to/your/music
UPDATE_INTERVAL=00:00
DISCORD_WEBHOOK=https://discord.com/api/webhooks/your-webhook-url
```

## 📦 Installation & Usage

### 🐳 Using Docker Hub Image

1. Create your `.env` file:
```bash
curl -O https://raw.githubusercontent.com/yourusername/trackly/main/.env.example
mv .env.example .env
```

2. Edit the `.env` file with your configuration:
```bash
nano .env
```

3. Create a docker-compose.yml:
```yaml
version: '3.8'

services:
  trackly:
    image: yourusername/trackly:latest
    volumes:
      - ${MUSIC_PATH:-./music}:/music:ro
    environment:
      - MUSIC_PATH=/music
      - UPDATE_INTERVAL=${UPDATE_INTERVAL:-"00:00"}
      - DISCORD_WEBHOOK=${DISCORD_WEBHOOK}
    restart: unless-stopped
```

4. Start the container:
```bash
docker-compose up -d
```

### 🛠️ Building from Source

1. Clone this repository:
```bash
git clone https://github.com/yourusername/trackly.git
cd trackly
```

2. Create and configure your `.env` file:
```bash
cp .env.example .env
nano .env
```

3. Build and start the container:
```bash
docker-compose up -d --build
```

## 💬 Discord Notifications

The bot sends beautiful Discord notifications with:

- 👤 Artist name
- 🎵 Album name
- 📅 Release date

## 🔄 How It Works

1. **Artist Discovery**: Scans your music directory for artist folders
2. **MusicBrainz Integration**:
   - Searches for artists on MusicBrainz
   - Stores artist IDs for efficient lookups
   - Checks for new album releases from the current year
3. **Smart Rate Limiting**:
   - Implements adaptive delays between requests
   - Uses exponential backoff for failed requests
   - Adds random jitter to prevent request clustering
4. **Local Library Check**:
   - Compares new releases with your local music folders
   - Only notifies for albums you don't have
5. **Performance Optimizations**:
   - JSON caching with TTL (Time To Live)
   - Thread-safe file operations
   - Efficient memory management
   - Automatic cleanup of old notifications
6. **Error Handling**:
   - Graceful recovery from API failures
   - Retry mechanisms with maximum attempts
   - Thread-safe file operations
   - Proper cleanup of resources

## 📊 Monitoring and Logs

```bash
# View container logs
docker-compose logs -f

# Check container status
docker-compose ps

# Stop the tracker
docker-compose down
```

## 👨‍💻 Development

### 🔄 GitHub Actions CI/CD

This project uses GitHub Actions for automated Docker image builds. To set up:

1. Fork this repository
2. Add these secrets to your GitHub repository:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

### 🏷️ Version Tags

- `latest`: Most recent build from main
- `vX.Y.Z`: Release versions (e.g., v1.0.0)
- `vX.Y`: Major.Minor version (e.g., v1.0)
- `sha-XXXXXXX`: Commit SHA

## 🔧 Troubleshooting

```bash
# Check environment variables
docker-compose config

# Verify music directory permissions
ls -l $MUSIC_PATH

# Check container logs
docker-compose logs

# Common Issues
- If you see file access errors, check directory permissions
- For API rate limit issues, the system will automatically back off
- Memory usage spikes are normal during initial scan
```

## 🆕 Recent Improvements

### Performance Enhancements
- Implemented JSON caching to reduce file I/O operations
- Added thread-safe file operations to prevent race conditions
- Improved memory management with efficient data structures
- Automatic cleanup of old notifications (runs on January 1st)

### Error Handling Improvements
- Enhanced MusicBrainz API error handling with retries
- Improved Discord webhook reliability
- Added maximum retry limits for all operations
- Implemented graceful error recovery

### Memory Management
- Efficient JSON file handling with caching
- Proper cleanup of file observer resources
- Reduced memory footprint for file operations

## 📄 License

MIT License - feel free to use and modify as needed.

---

<div align="center">
Made with ❤️ by 7eventy7
</div>