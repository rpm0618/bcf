import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import ChunkPos from "../utils/chunkPos";
import Button from "./Button";
import ChunkMap from "./ChunkMap";
import ChunkPosInput from "./ChunkPosInput";

interface ClusterFinderProps {

}

const saveToCsv = (cluster: Record<string, ChunkPos>) => {
    const contents = "x,z\n" + Object.values(cluster).map((c) => `${c.x},${c.z}`).join("\n");
    const dataUrl = URL.createObjectURL(new Blob([contents], {type: "text/csv"}));

    const tempLink = document.createElement("a");
    tempLink.setAttribute("href", dataUrl);
    tempLink.setAttribute("download", "cluster.csv");
    tempLink.click();

    URL.revokeObjectURL(dataUrl);
}

export default (props: ClusterFinderProps) => {
    const [viewTarget, setViewTarget] = useState(ChunkPos.from(0, 0));
    const [viewDistance, setViewDistance] = useState(50);
    const [clusterTarget, setClusterTarget] = useState(ChunkPos.from(0, 0));
    const [mask, setMask] = useState(4095n);

    const [clusterChunks, setClusterChunks] = useState<Record<string, ChunkPos>>({});
    const [inViewClusterChunks, setInViewClusterChunks] = useState<ChunkPos[]>([]);

    const clearCluster = () => {
        setClusterChunks({});
    }

    // Clear cluster chunks when changing cluster parameters
    useEffect(() => {
        clearCluster();
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

    return (
        <div className="flex p-2">
            <div className="flex flex-col pr-8">
                <label className="pb-2">
                    Cluster Target
                    <ChunkPosInput chunkPos={clusterTarget} onChunkChanged={setClusterTarget} />
                </label>
                <label className="pb-4">
                    <span className="block pb-1">Hashmap Size</span>
                    <select className="border border-black" value={Number(mask)} onChange={(e) => setMask(BigInt(e.target.value))}>
                        <option value={4095}>4096</option>
                        <option value={8191}>8192</option>
                        <option value={16383}>16384</option>
                    </select>
                </label>
                <label>
                    <span className="block pb-1">Current Cluster ({Object.keys(clusterChunks).length} chunks) 
                    <a className="float-right underline cursor-pointer" onClick={clearCluster}>Clear</a></span>
                    <textarea className="border border-black p-1" readOnly cols={35} rows={10} value={clusterString}/>
                </label>
                <Button onClick={addInViewChunks}>Add chunks to cluster</Button>
                <Button onClick={() => saveToCsv(clusterChunks)}>Save to CSV</Button>
            </div>
            <div className="flex flex-col items-end">
                <ChunkMap
                    width={512}
                    height={512}
                    viewTarget={viewTarget}
                    viewDistance={viewDistance}
                    clusterTarget={clusterTarget}
                    mask={mask}
                    onClusterChunksChanged={setInViewClusterChunks}
                />
                <label className="pb-2 pt-2">
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