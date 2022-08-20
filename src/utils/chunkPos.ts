class ChunkPos {
    public x: bigint;
    public z: bigint;

    constructor(x: bigint, z: bigint) {
        this.x = x;
        this.z = z;
    }

    public asLong() {
        return ChunkPos.asLong(this.x, this.z);
    }

    public hash1_8(mask: bigint) {
        return ChunkPos.hash1_8(this.x, this.z, mask);
    }

    public hash1_12(mask: bigint) {
        return ChunkPos.hash1_12(this.x, this.z, mask);
    }

    public equals(other: ChunkPos) {
        return this.x === other.x && this.z === other.z;
    }

    public static asLong(x: bigint, z: bigint) {
        return BigInt.asIntN(64, (x & 4294967295n) | ((z & 4294967295n) << 32n));
    }

    public static from(x: number, z: number) {
        return new ChunkPos(BigInt(x), BigInt(z));
    }

    public static hash1_8(x: bigint, z: bigint, mask: bigint){
        const long = ChunkPos.asLong(x, z);
    
        const step1 = BigInt.asUintN(32, (long ^ (long >> 32n)));
        const step2 = step1 ^ (step1 >> 20n) ^ (step1 >> 12n);
        const hash = step2 ^ (step2 >> 7n) ^ (step2 >> 4n);

        return BigInt.asIntN(32, hash) & mask;
    }
    
    public static hash1_12(x: bigint, z: bigint, mask: bigint) {
        const long = ChunkPos.asLong(x, z);
    
        const step1 = BigInt.asUintN(64, long * -7046029254386353131n);
        const step2 = step1 ^ (step1 >> 32n);
        const hash = BigInt.asIntN(64, step2 ^ (step2 >> 16n))
    
        return BigInt.asIntN(32, hash) & mask;
    }
}

export default ChunkPos;