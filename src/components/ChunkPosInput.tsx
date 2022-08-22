import * as React from "react";
import ChunkPos from "../utils/chunkPos";

interface ChunkPosInputProps {
    chunkPos: ChunkPos,
    onChunkChanged: (newPos: ChunkPos) => unknown
}

export default (props: ChunkPosInputProps) => {
    const {chunkPos, onChunkChanged} = props;

    return (
        <div className="flex p-1">
            <div className="pr-2">
                <label className="flex pb-1">
                    <span className="w-4">X</span>
                    <input className="border border-black pl-1" type="number" value={Number(chunkPos.x)} onChange={(e) => {
                        onChunkChanged(new ChunkPos(BigInt(e.target.valueAsNumber), chunkPos.z));
                    }}/>
                </label>
                <label className="flex">
                    <span className="w-4">Z</span>
                    <input className="border border-black pl-1" type="number" value={Number(chunkPos.z)} onChange={(e) => {
                        onChunkChanged(new ChunkPos(chunkPos.x, BigInt(e.target.valueAsNumber)));
                    }}/>
                </label>
            </div>
        </div>
    )
}