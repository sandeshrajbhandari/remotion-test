import { AbsoluteFill, Img, staticFile } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { getImageSrc } from "./utils/imageUtils";
export const myCompSchema3 = z.object({
    titleText: z.string(),
    titleColor: zColor(),
});

export const imageScreenSchema = z.object({
    titleText: z.string(),
    imageSource: z.string().describe("Image source - can be local path, URL, or base64 data"),
});

export const TitleScreen: React.FC<z.infer<typeof myCompSchema3>> = ({
    titleText,
    titleColor,
}) => {
    return (
        <AbsoluteFill className="flex flex-col bg-url justify-center items-center gap-8">
            {/* background image */}
            <Img src={"https://walker-web.imgix.net/cms/Gradient_builder_2.jpg?auto=format,compress&w=1920&h=1200&fit=crop&dpr=1.5"} className="absolute inset-0 w-full h-full object-cover -z-30" />

            <div className="text-center">
                <h1 className="text-9xl font-bold bg-gray-200 px-16 py-16 rounded-xl shadow-2xl" style={{ color: titleColor }}>
                    {titleText}
                </h1>
            </div>
            <h2 className="text-4xl px-6 py-3 rounded-lg">

            </h2>
        </AbsoluteFill>
    );
};

export const ImageScreen: React.FC<{
    imageSource: string;
    titleText: string;
}> = ({
    imageSource,
    titleText,
}) => {
        return (
            <AbsoluteFill className="flex flex-col bg-teal-200 justify-center items-center gap-8">
                <Img src={getImageSrc(imageSource)} className="rounded-3xl shadow-2xl min-h-[50vh] max-h-[50vh] max-w-[70vw] object-contain" />
                <h1 className=" bg-red-200 px-6 py-3 rounded-lg">{titleText}</h1>
            </AbsoluteFill>
        );
    };

export const AvatarScreen: React.FC<{
    imageSource: string;
    alignment: "center" | "left" | "right";
    titleText: string;
}> = ({
    imageSource,
    alignment,
    titleText,
}) => {
        return (
            <AbsoluteFill className="bg-teal-200">
                {alignment === "center" ? (
                    <div className="flex justify-center items-center h-full">
                        <Img src={getImageSrc(imageSource)} className="rounded-full shadow-2xl h-[50vh] w-[50vh] object-cover" />
                    </div>
                ) : (
                    <div className={`flex ${alignment === "left" ? "flex-row" : "flex-row-reverse"} items-center h-full px-32 gap-12`}>
                        <Img src={getImageSrc(imageSource)} className="rounded-2xl max-h-[50vh] max-w-[50vw] object-cover flex-1/3" />
                        <h1 className="bg-white px-6 py-20 rounded-lg text-center flex-2/3 w-full" style={{
                            fontSize: titleText.length > 30 ? '2rem' : titleText.length > 20 ? '3rem' : '4rem'
                        }}>{titleText}</h1>
                    </div>
                )}
            </AbsoluteFill>
        );
    };
