import React from 'react';
import { useCurrentFrame, useVideoConfig } from "remotion";
import { noise3D } from "@remotion/noise";
import { interpolate } from "remotion";

const OVERSCAN_MARGIN = 100;
const ROWS = 10;
const COLS = 15;
// reference - https://www.remotion.dev/docs/noise-visualization, added looping functionality.
export const DotBgAnim: React.FC<{
    speed?: number;
    circleRadius?: number;
    maxOffset?: number;
    color?: string;
    rows?: number;
    cols?: number;
}> = ({
    speed = 0.013,
    circleRadius = 5,
    maxOffset = 20,
    color = "gray",
    rows = ROWS,
    cols = COLS
}) => {
        const frame = useCurrentFrame();
        const { height, width, durationInFrames } = useVideoConfig();

        // Create a looping time value between 0 and 1
        const loopProgress = (frame % durationInFrames) / durationInFrames;
        const loopTime = loopProgress * Math.PI * 2;

        return (
            <div className="absolute inset-0 w-full h-full object-cover -z-30 bg-white">
                <svg width={width} height={height}>
                    {new Array(cols).fill(0).map((_, i) =>
                        new Array(rows).fill(0).map((__, j) => {
                            const x = i * ((width + OVERSCAN_MARGIN) / cols);
                            const y = j * ((height + OVERSCAN_MARGIN) / rows);
                            const px = i / cols;
                            const py = j / rows;

                            // Use sine and cosine for smooth looping motion
                            const dx = Math.sin(loopTime + px * Math.PI) * maxOffset;
                            const dy = Math.cos(loopTime + py * Math.PI) * maxOffset;

                            // Create smooth opacity transitions that loop
                            const opacity = interpolate(
                                noise3D("opacity", i, j, frame * speed),
                                [-1, 1],
                                [0.2, 1]
                            );

                            const key = `${i}-${j}`;

                            return (
                                <circle
                                    key={key}
                                    cx={x + dx}
                                    cy={y + dy}
                                    r={circleRadius}
                                    fill={color}
                                    opacity={opacity}
                                />
                            );
                        })
                    )}
                </svg>
            </div>
        );
    };
