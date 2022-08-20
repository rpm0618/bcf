import * as React from "react"
import ChunkPos from "../utils/chunkPos"

interface ChunkPosInputProps {
    chunkPos: ChunkPos,
    onChunkChanged: (newPos: ChunkPos) => unknown
}

export default (props: ChunkPosInputProps) => {
    const {chunkPos, onChunkChanged} = props;

    return (
        <div>
            <label>X
                <input type="number" value={Number(chunkPos.x)} onChange={(e) => {
                    onChunkChanged(new ChunkPos(BigInt(e.target.valueAsNumber), chunkPos.z));
                }}/>
            </label>
            <label>Z
            <input type="number" value={Number(chunkPos.z)} onChange={(e) => {
                    onChunkChanged(new ChunkPos(chunkPos.x, BigInt(e.target.valueAsNumber)));
                }}/>
            </label>
        </div>
    )
}