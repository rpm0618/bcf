import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChunkPos from "../utils/chunkPos";
import Button from "./Button";
import ChunkMap from "./ChunkMap";
import ChunkPosInput from "./ChunkPosInput";

interface ClusterFinderProps {

}

export default (props: ClusterFinderProps) => {
    const [viewTarget, setViewTarget] = useState(ChunkPos.from(0, 0));
    const [viewDistance, setViewDistance] = useState(50);
    const [clusterTarget, setClusterTarget] = useState(ChunkPos.from(0, 0));
    const [mask, setMask] = useState(4095n);

    const [clusterChunks, setClusterChunks] = useState<Record<string, ChunkPos>>({});
    const [inViewClusterChunks, setInViewClusterChunks] = useState<ChunkPos[]>([]);

    // Clear cluster chunks when changing cluster parameters
    useEffect(() => {
        setClusterChunks({});
    }, [clusterTarget, mask])

    const clusterString = useMemo(() => {
        return Object.values(clusterChunks).join("\n");
    }, [clusterChunks]);

    const addInViewChunks = () => {
        setClusterChunks(currClusterChunks => {
            const newChunks = inViewClusterChunks.reduce((prev, curr) => ({
                ...prev,
                [curr.toString()]: curr
            }), {});
            return {...currClusterChunks, ...newChunks};
        })
    };

    const clearCluster = () => {
        setClusterChunks({});
    }

    return (
        <div className="flex p-2">
            <div className="flex flex-col p-4">
                <label className="pb-1">
                    Cluster Target
                    <ChunkPosInput chunkPos={clusterTarget} onChunkChanged={setClusterTarget} />
                </label>
                <label className="pb-4">
                    <span className="pr-1">Hashmap Size</span>
                    <select className="border border-black" value={Number(mask)} onChange={(e) => setMask(BigInt(e.target.value))}>
                        <option value={4095}>4096</option>
                        <option value={8191}>8192</option>
                        <option value={16383}>16384</option>
                    </select>
                </label>
                <label>
                    <span className="block pb-1">Current Cluster ({Object.keys(clusterChunks).length} chunks)</span>
                    <textarea className="border border-black p-1" readOnly cols={30} rows={10} value={clusterString}/>
                </label>
                <Button onClick={addInViewChunks}>Add chunks to cluster</Button>
                <Button onClick={clearCluster}>Clear</Button>
            </div>
            <div className="flex flex-col">
                <ChunkMap
                    width={512}
                    height={512}
                    viewTarget={viewTarget}
                    viewDistance={viewDistance}
                    clusterTarget={clusterTarget}
                    mask={mask}
                    onClusterChunksChanged={setInViewClusterChunks}
                />
                <label className="pb-1">
                    View Target
                    <ChunkPosInput chunkPos={viewTarget} onChunkChanged={setViewTarget} />
                </label>
                <label>
                    <span className="pr-1">View Distance</span>
                    <input className="border border-black pl-1" type="number" value={viewDistance} onChange={(e) => setViewDistance(e.target.valueAsNumber)}/>
                </label>
            </div>
        </div>
    );
}