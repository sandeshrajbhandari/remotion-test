import { staticFile } from "remotion";

export type ImageSource = {
    type: 'local' | 'url' | 'base64';
    value: string;
};

/**
 * Determines the image source type and returns the appropriate src for Img component
 * @param imageInput - Can be a local path, URL, or base64 data
 * @returns The appropriate src string for the Img component
 */
export function getImageSrc(imageInput: string): string {
    // Check if it's a base64 data URL
    if (imageInput.startsWith('data:image/')) {
        return imageInput;
    }

    // Check if it's a URL (http/https)
    if (imageInput.startsWith('http://') || imageInput.startsWith('https://')) {
        return imageInput;
    }

    // Otherwise, treat it as a local file path
    return staticFile(imageInput);
}

/**
 * Parses an image input string and returns structured information
 * @param imageInput - The image input string
 * @returns ImageSource object with type and value
 */
export function parseImageSource(imageInput: string): ImageSource {
    if (imageInput.startsWith('data:image/')) {
        return {
            type: 'base64',
            value: imageInput
        };
    }

    if (imageInput.startsWith('http://') || imageInput.startsWith('https://')) {
        return {
            type: 'url',
            value: imageInput
        };
    }

    return {
        type: 'local',
        value: imageInput
    };
}

/**
 * Validates if the image input is valid
 * @param imageInput - The image input string
 * @returns boolean indicating if the input is valid
 */
export function isValidImageInput(imageInput: string): boolean {
    if (!imageInput || typeof imageInput !== 'string') {
        return false;
    }

    // Check base64 format
    if (imageInput.startsWith('data:image/')) {
        return imageInput.includes('base64,') && imageInput.length > 100;
    }

    // Check URL format
    if (imageInput.startsWith('http://') || imageInput.startsWith('https://')) {
        try {
            new URL(imageInput);
            return true;
        } catch {
            return false;
        }
    }

    // Check local file path (basic validation)
    return imageInput.length > 0 && !imageInput.includes('..');
}
