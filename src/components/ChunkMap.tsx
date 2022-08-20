import * as React from "react";
import { useEffect, useRef } from "react";
import ChunkPos from "../utils/chunkPos";

export interface ChunkMapProps {
    width: number,
    height: number,
    viewTarget: ChunkPos,
    viewDistance: number,
    clusterTarget: ChunkPos,
    mask: bigint,
};

export default (props: ChunkMapProps) => {
    const {
        width,
        height,
        viewTarget,
        viewDistance,
        clusterTarget,
        mask
    } = props;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (canvasRef.current){
            const canvas = canvasRef.current;
            const context = canvasRef.current.getContext("2d") as CanvasRenderingContext2D;
            context.clearRect(0, 0, canvas.width, canvas.height);

            const chunksAcross = (viewDistance * 2) + 1;
            const chunkWidth = canvas.width / chunksAcross;

            const chunksHigh = (viewDistance * 2) + 1;
            const chunkHeight = canvas.height / chunksHigh;

            const nwCorner = new ChunkPos(viewTarget.x - BigInt(viewDistance), viewTarget.z - BigInt(viewDistance));

            const targetHash = ChunkPos.hash1_8(clusterTarget.x, clusterTarget.z, mask);

            for (let ox = 0; ox < chunksAcross; ox++) {
                for (let oz = 0; oz < chunksHigh; oz++) {
                    const x = nwCorner.x + BigInt(ox);
                    const z = nwCorner.z + BigInt(oz);

                    const chunkHash = ChunkPos.hash1_8(x, z, mask);

                    if (chunkHash === targetHash) {
                        context.fillStyle = "red";
                        context.fillRect(ox * chunkWidth, oz * chunkHeight, chunkWidth, chunkHeight);
                    }
                    if (x === clusterTarget.x && z === clusterTarget.z) {
                        context.fillStyle = "green";
                        context.fillRect(ox * chunkWidth, oz * chunkHeight, chunkWidth, chunkHeight);
                    }

                }
            }
        }
    }, [canvasRef, viewTarget])

    return (<canvas ref={canvasRef} width={width} height={height} style={{"border": "1px solid black"}}></canvas>);
}