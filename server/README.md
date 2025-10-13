# Remotion Render Server

An Express server for rendering Remotion videos and stills with caching capabilities.

## Features

- **Video Rendering**: Render any composition as MP4 video
- **Still Rendering**: Render any composition as PNG still image
- **Composition Caching**: Return cached renders regardless of input props
- **File Management**: Automatic cleanup of old files
- **RESTful API**: Easy-to-use HTTP endpoints

## API Endpoints

### POST /render/video
Render a video composition.

**Request Body:**
```json
{
  "compositionId": "HelloWorld",
  "inputProps": {
    "titleText": "Custom Title",
    "titleColor": "#ff0000"
  },
  "compositionCache": true,
  "codec": "h264"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Video rendered successfully",
  "filename": "HelloWorld_2024-01-15T10-30-45-123Z.mp4",
  "filePath": "/path/to/renders/HelloWorld_2024-01-15T10-30-45-123Z.mp4",
  "cached": false
}
```

### POST /render/still
Render a still image.

**Request Body:**
```json
{
  "compositionId": "TitleScreenStill",
  "inputProps": {
    "titleText": "Custom Title",
    "titleColor": "#ff0000"
  },
  "compositionCache": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Still rendered successfully",
  "filename": "TitleScreenStill_2024-01-15T10-30-45-123Z.png",
  "filePath": "/path/to/renders/TitleScreenStill_2024-01-15T10-30-45-123Z.png",
  "cached": false
}
```

### GET /compositions
List available compositions.

**Response:**
```json
{
  "success": true,
  "compositions": [
    { "id": "HelloWorld", "type": "video" },
    { "id": "OnlyLogo", "type": "video" },
    { "id": "TitleScreen", "type": "video" },
    { "id": "TitleScreenStill", "type": "still" }
  ]
}
```

### GET /renders
List all rendered files.

**Response:**
```json
{
  "success": true,
  "files": [
    {
      "filename": "HelloWorld_2024-01-15T10-30-45-123Z.mp4",
      "size": 1024000,
      "created": "2024-01-15T10:30:45.123Z",
      "modified": "2024-01-15T10:30:45.123Z",
      "type": "video"
    }
  ]
}
```

### DELETE /renders/:filename
Delete a specific rendered file.

**Response:**
```json
{
  "success": true,
  "message": "File HelloWorld_2024-01-15T10-30-45-123Z.mp4 deleted successfully"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

## Usage Examples

### Using curl

```bash
# Render a video
curl -X POST http://localhost:3000/render/video \
  -H "Content-Type: application/json" \
  -d '{
    "compositionId": "HelloWorld",
    "inputProps": {
      "titleText": "My Custom Video",
      "titleColor": "#ff0000"
    },
    "compositionCache": true
  }'

# Render a still
curl -X POST http://localhost:3000/render/still \
  -H "Content-Type: application/json" \
  -d '{
    "compositionId": "TitleScreenStill",
    "inputProps": {
      "titleText": "My Custom Still",
      "titleColor": "#00ff00"
    },
    "compositionCache": true
  }'

# List compositions
curl http://localhost:3000/compositions

# List rendered files
curl http://localhost:3000/renders

# Delete a file
curl -X DELETE http://localhost:3000/renders/HelloWorld_2024-01-15T10-30-45-123Z.mp4
```

### Using PowerShell (Windows)

```powershell
# Render a video
$body = @{
    compositionId = "HelloWorld"
    inputProps = @{
        titleText = "My Custom Video"
        titleColor = "#ff0000"
    }
    compositionCache = $true
} | ConvertTo-Json -Depth 3

Invoke-WebRequest -Uri "http://localhost:3000/render/video" -Method POST -Body $body -ContentType "application/json"

# Render a still
$body = @{
    compositionId = "TitleScreenStill"
    inputProps = @{
        titleText = "My Custom Still"
        titleColor = "#00ff00"
    }
    compositionCache = $true
} | ConvertTo-Json -Depth 3

Invoke-WebRequest -Uri "http://localhost:3000/render/still" -Method POST -Body $body -ContentType "application/json"

# List compositions
Invoke-WebRequest -Uri "http://localhost:3000/compositions"

# List rendered files
Invoke-WebRequest -Uri "http://localhost:3000/renders"
```

### Using JavaScript/Node.js

```javascript
// Render a video
const response = await fetch('http://localhost:3000/render/video', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    compositionId: 'HelloWorld',
    inputProps: {
      titleText: 'My Custom Video',
      titleColor: '#ff0000'
    },
    compositionCache: true,
    codec: 'h264'
  })
});

const result = await response.json();
console.log(result);
```

## Installation & Setup

Since this project uses pnpm:

```bash
# Install dependencies
pnpm install

# Run the server in production mode
pnpm run server

# Run the server in development mode (with auto-reload)
pnpm run server:dev

# Run Remotion studio for development
pnpm run dev
```

## Configuration

- **Port**: Set via `PORT` environment variable (default: 3000)
- **Renders Directory**: Files are saved to `./renders/` directory
- **File Cleanup**: Keeps the 10 most recent files per composition
- **Bundle Caching**: Bundle is created once and reused for all renders

## Caching Behavior

When `compositionCache: true` is set:
- The server will look for existing files with the same composition ID
- If found, it returns the cached file regardless of input props
- If not found, it renders a new file and caches it

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad request (validation errors)
- `500`: Internal server error
