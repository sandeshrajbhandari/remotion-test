# Unified Image Handling System

This system provides a unified way to handle images in Remotion compositions, supporting local files, URLs, and base64 data.

## Features

- **Unified API**: Single function `getImageSrc()` handles all image types
- **Type Safety**: TypeScript support with proper type definitions
- **Server Support**: Base64 image upload endpoint for dynamic image handling
- **Validation**: Built-in validation for different image input types

## Usage

### Basic Usage

```tsx
import { Img } from "remotion";
import { getImageSrc } from "./utils/imageUtils";

// All of these work with the same function:
<Img src={getImageSrc("screenshot1.png")} />                    // Local file
<Img src={getImageSrc("https://example.com/image.jpg")} />       // URL
<Img src={getImageSrc("data:image/png;base64,iVBORw0KGgo...")} /> // Base64
```

### Component Example

```tsx
import { AbsoluteFill, Img } from "remotion";
import { getImageSrc } from "./utils/imageUtils";

export const ImageScreen: React.FC<{
    imageSource: string;
    titleText: string;
}> = ({ imageSource, titleText }) => {
    return (
        <AbsoluteFill className="flex flex-col bg-teal-200 justify-center items-center gap-8">
            <Img src={getImageSrc(imageSource)} className="rounded-3xl w-4/6 h-auto shadow-2xl" />
            <h1 className="bg-red-200 px-6 py-3 rounded-lg">{titleText}</h1>
        </AbsoluteFill>
    );
};
```

## API Reference

### `getImageSrc(imageInput: string): string`

Determines the image source type and returns the appropriate src for Img component.

**Parameters:**
- `imageInput`: Can be a local path, URL, or base64 data

**Returns:**
- The appropriate src string for the Img component

**Examples:**
```tsx
getImageSrc("screenshot1.png")                    // Returns: staticFile("screenshot1.png")
getImageSrc("https://example.com/image.jpg")       // Returns: "https://example.com/image.jpg"
getImageSrc("data:image/png;base64,iVBORw0KGgo...") // Returns: "data:image/png;base64,iVBORw0KGgo..."
```

### `parseImageSource(imageInput: string): ImageSource`

Parses an image input string and returns structured information.

**Returns:**
```tsx
{
  type: 'local' | 'url' | 'base64';
  value: string;
}
```

### `isValidImageInput(imageInput: string): boolean`

Validates if the image input is valid.

## Server API

### POST `/upload/image`

Upload a base64 image to the server.

**Request Body:**
```json
{
  "base64Data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "filename": "uploaded_abc123.png",
  "url": "/public/uploaded_abc123.png"
}
```

## Image Types Supported

### 1. Local Files
- **Format**: File path relative to the public directory
- **Example**: `"screenshot1.png"`
- **Usage**: Files in the `public/` directory are served statically

### 2. URLs
- **Format**: Full HTTP/HTTPS URLs
- **Example**: `"https://picsum.photos/400/300"`
- **Usage**: Direct image URLs from external sources

### 3. Base64 Data
- **Format**: Data URLs with base64 encoding
- **Example**: `"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."`
- **Usage**: Inline image data, can be uploaded to server for caching

## Schema Definition

```tsx
import { z } from "zod";

export const imageScreenSchema = z.object({
    titleText: z.string(),
    imageSource: z.string().describe("Image source - can be local path, URL, or base64 data"),
});
```

## Best Practices

1. **Use the unified function**: Always use `getImageSrc()` instead of mixing `staticFile()` and direct URLs
2. **Validate inputs**: Use `isValidImageInput()` for client-side validation
3. **Handle errors**: Wrap image loading in error boundaries for production
4. **Optimize base64**: For large images, consider uploading to server instead of using base64
5. **Cache URLs**: Use the server upload endpoint for dynamic base64 images

## Examples

### Complete Component with All Image Types

```tsx
import { AbsoluteFill, Img } from "remotion";
import { z } from "zod";
import { getImageSrc, parseImageSource } from "./utils/imageUtils";

export const imageExamplesSchema = z.object({
    localImage: z.string().describe("Local image path"),
    urlImage: z.string().url().describe("Image URL"),
    base64Image: z.string().describe("Base64 image data"),
    titleText: z.string(),
});

export const ImageExamples: React.FC<z.infer<typeof imageExamplesSchema>> = ({
    localImage,
    urlImage,
    base64Image,
    titleText,
}) => {
    return (
        <AbsoluteFill className="flex flex-col bg-gray-100 p-8 gap-6">
            <h1 className="text-4xl font-bold text-center">{titleText}</h1>
            
            <div className="grid grid-cols-3 gap-6">
                <Img src={getImageSrc(localImage)} className="rounded-lg" />
                <Img src={getImageSrc(urlImage)} className="rounded-lg" />
                <Img src={getImageSrc(base64Image)} className="rounded-lg" />
            </div>
        </AbsoluteFill>
    );
};
```

This system ensures consistency across your Remotion project and makes it easy to work with different image sources without confusion.
