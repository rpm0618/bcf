import * as React from "react";
import { useState } from "react";
import ChunkPos from "../utils/chunkPos";
import ChunkMap from "./ChunkMap";
import ChunkPosInput from "./ChunkPosInput";

interface ClusterFinderProps {

}

export default (props: ClusterFinderProps) => {
    const [viewTarget, setViewTarget] = useState(ChunkPos.from(0, 0));
    const [viewDistance, setViewDistance] = useState(50);
    const [clusterTarget, setClusterTarget] = useState(ChunkPos.from(0, 0));
    const [mask, setMask] = useState(4095n);
    return (
        <div>
            <ChunkMap
                width={512}
                height={512}
                viewTarget={viewTarget}
                viewDistance={viewDistance}
                clusterTarget={clusterTarget}
                mask={mask}
            />
            <ChunkPosInput chunkPos={viewTarget} onChunkChanged={setViewTarget} />
        </div>
    );
}