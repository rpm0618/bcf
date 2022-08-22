import * as React from "react";
import { useState } from "react";
import ChunkPos from "../utils/chunkPos";
import Button from "./Button";

interface ChunkPosInputProps {
    chunkPos: ChunkPos,
    onChunkChanged: (newPos: ChunkPos) => unknown
}

export default (props: ChunkPosInputProps) => {
    const {chunkPos, onChunkChanged} = props;

    const [step, setStep] = useState(1);

    const nudge = (dx: number, dz: number) => {
        onChunkChanged(new ChunkPos(chunkPos.x + BigInt(dx), chunkPos.z + BigInt(dz)));
    };

    return (
        <div className="flex p-1">
            <div className="flex flex-col mb-1 justify-between pr-2">
                <div>
                    <label className="flex pb-1">
                        <span className="w-4">X</span>
                        <input className="border border-black pl-1 w-32" type="number" value={Number(chunkPos.x)} onChange={(e) => {
                            onChunkChanged(new ChunkPos(BigInt(e.target.valueAsNumber), chunkPos.z));
                        }}/>
                    </label>
                    <label className="flex">
                        <span className="w-4">Z</span>
                        <input className="border border-black pl-1 w-32" type="number" value={Number(chunkPos.z)} onChange={(e) => {
                            onChunkChanged(new ChunkPos(chunkPos.x, BigInt(e.target.valueAsNumber)));
                        }}/>
                    </label>
                </div>
                <label className="flex">
                    <span className="w-12">Step</span>
                    <input className="border border-black pl-1 w-24" type="number" value={step} min={1} onChange={(e) => {
                        setStep(e.target.valueAsNumber);
                    }}/>
                </label>
            </div>
            <div className="grid gap-1 grid-cols-3 grid-rows-3">
                <Button className="w-8 h-8" onClick={() => nudge(-step, -step)}>🡬</Button>
                <Button className="w-8 h-8" onClick={() => nudge(0, -step)}>🡩</Button>
                <Button className="w-8 h-8" onClick={() => nudge(step, -step)}>🡭</Button>

                <Button className="w-8 h-8" onClick={() => nudge(-step, 0)}>🡨</Button>
                <div/>
                <Button className="w-8 h-8" onClick={() => nudge(step, 0)}>🡪</Button>

                <Button className="w-8 h-8" onClick={() => nudge(-step, step)}>🡯</Button>
                <Button className="w-8 h-8" onClick={() => nudge(0, step)}>🡫</Button>
                <Button className="w-8 h-8" onClick={() => nudge(step, step)}>🡮</Button>
            </div>
        </div>
    )
}