import { AbsoluteFill, Img } from "remotion";
import { z } from "zod";
import { getImageSrc, parseImageSource } from "./utils/imageUtils";

export const imageExamplesSchema = z.object({
    localImage: z.string().describe("Local image path (e.g., 'screenshot1.png')"),
    urlImage: z.string().url().describe("Image URL (e.g., 'https://example.com/image.jpg')"),
    base64Image: z.string().describe("Base64 image data (e.g., 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...')"),
    titleText: z.string(),
});

export const ImageExamples: React.FC<z.infer<typeof imageExamplesSchema>> = ({
    localImage,
    urlImage,
    base64Image,
    titleText,
}) => {
    const localSrc = getImageSrc(localImage);
    const urlSrc = getImageSrc(urlImage);
    const base64Src = getImageSrc(base64Image);

    const localInfo = parseImageSource(localImage);
    const urlInfo = parseImageSource(urlImage);
    const base64Info = parseImageSource(base64Image);

    return (
        <AbsoluteFill className="flex flex-col bg-gray-100 p-8 gap-6">
            <h1 className="font-bold text-center mb-4">{titleText}</h1>

            <div className="grid grid-cols-3 gap-6 flex-1">
                {/* Local Image */}
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-xl font-semibold">Local Image</h2>
                    <div className="bg-white p-4 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-center">
                        <Img
                            src={localSrc}
                            className="max-w-full max-h-64 rounded-lg shadow-md"
                        />
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                        <p><strong>Type:</strong> {localInfo.type}</p>
                        <p><strong>Value:</strong> {localInfo.value}</p>
                    </div>
                </div>

                {/* URL Image */}
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-xl font-semibold">URL Image</h2>
                    <div className="bg-white p-4 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-center">
                        <Img
                            src={urlSrc}
                            className="max-w-full max-h-64 rounded-lg shadow-md"
                        />
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                        <p><strong>Type:</strong> {urlInfo.type}</p>
                        <p><strong>Value:</strong> {urlInfo.value.substring(0, 50)}...</p>
                    </div>
                </div>

                {/* Base64 Image */}
                <div className="flex flex-col items-center gap-4">
                    <h2 className="text-xl font-semibold">Base64 Image</h2>
                    <div className="bg-white p-4 rounded-lg shadow-lg flex-1 flex flex-col items-center justify-center">
                        <Img
                            src={base64Src}
                            className="max-w-full max-h-64 rounded-lg shadow-md"
                        />
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                        <p><strong>Type:</strong> {base64Info.type}</p>
                        <p><strong>Value:</strong> {base64Info.value.substring(0, 50)}...</p>
                    </div>
                </div>
            </div>
        </AbsoluteFill>
    );
};
