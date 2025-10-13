import { ComponentType } from "react";
import { z } from "zod";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import MasterSequenceComp from "./MasterSequenceComp";
import {
    TitleScreen as TitleScreenStill,
    myCompSchema3,
    ImageScreen,
    imageScreenSchema,
    AvatarScreen,
} from "./3.still-test";

export type RegistryEntry = {
    id: string;
    kind: "still" | "composition";
    component: ComponentType<any>;
    width: number;
    height: number;
    fps?: number;
    durationInFrames?: number; // required for kind === "composition"
    schema?: z.ZodTypeAny;
    defaultProps?: Record<string, unknown>;
};

// Central registry of all compositions and stills by ID
export const compositionRegistry: RegistryEntry[] = [
    {
        id: "TitleScreenStill",
        kind: "still",
        component: TitleScreenStill,
        width: 1920,
        height: 1080,
        schema: myCompSchema3,
        defaultProps: {
            titleText: "Title Screen",
            titleColor: "#000000",
        },
    },
    {
        id: "ImageScreen",
        kind: "still",
        component: ImageScreen,
        width: 1920,
        height: 1080,
        schema: imageScreenSchema,
        defaultProps: {
            titleText: "Image Screen",
            imageSource:
                "https://imgs.search.brave.com/y4aahJnEro56covSl-3LEdHiGClPuWSYadZA02mpws8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbGF5/LWxoLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9mS25scFl3ejla/b1ZKMUYwR0VCN0FV/MjI0T09iRDRxQnZX/NlpjY3BBY2NWN25H/U0tfbFNIRFd1eWtV/T0xlNjVoNzJJPXc1/MjYtaDI5Ni1ydw",
        },
    },
    {
        id: "AvatarScreen",
        kind: "still",
        component: AvatarScreen,
        width: 1920,
        height: 1080,
        defaultProps: {
            titleText: "Avatar Screen Left Alignment",
            imageSource:
                "https://imgs.search.brave.com/APvU3Zz0q9tkRJcKzDXpFmiscdWYvZYWWLAgmMFdOR8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTIvQXZh/dGFyLVByb2ZpbGUt/VmVjdG9yLVBORy1G/aWxlLnBuZw",
            alignment: "left",
        },
    },
    {
        id: "HelloWorld",
        kind: "composition",
        component: HelloWorld,
        width: 1920,
        height: 1080,
        fps: 30,
        durationInFrames: 150,
        schema: myCompSchema,
        defaultProps: {
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
        },
    },
    {
        id: "OnlyLogo",
        kind: "composition",
        component: Logo,
        width: 1920,
        height: 1080,
        fps: 30,
        durationInFrames: 150,
        schema: myCompSchema2,
        defaultProps: {
            logoColor1: "#91dAE2",
            logoColor2: "#86A8E7",
        },
    },
    {
        id: "MasterSequence",
        kind: "composition",
        component: MasterSequenceComp,
        width: 1920,
        height: 1080,
        fps: 30,
        durationInFrames: 130, // matches current sum in Root
        defaultProps: {
            shots: [
                {
                    compositionId: "ImageScreen",
                    compositionProps: {
                        titleText: "First Image",
                        imageSource: "https://picsum.photos/seed/first/1200/800",
                    },
                    fromFrame: 0,
                    durationInFrames: 40,
                },
                {
                    compositionId: "ImageScreen",
                    compositionProps: {
                        titleText: "Second Image",
                        imageSource: "https://picsum.photos/seed/second/1200/800",
                    },
                    fromFrame: 0,
                    durationInFrames: 20,
                },
                {
                    compositionId: "TitleScreenStill",
                    compositionProps: {
                        titleText: "The End",
                        titleColor: "#000000",
                    },
                    fromFrame: 0,
                    durationInFrames: 70,
                },
            ],
        },
    },
];

export const compositionIdToEntry = Object.fromEntries(
    compositionRegistry.map((e) => [e.id, e])
) as Record<string, RegistryEntry>;


