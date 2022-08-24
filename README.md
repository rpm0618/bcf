# Browser Cluster Finder

https://rpm0618.github.io/bcf/

## What is this?
A (very) WIP browser based cluster finder for creating delay in Minecraft threadstone related exploits. It currently targets Minecraft 1.8, but aims to eventually support all versions between 1.8 and 1.12.

## Quickstart
Tested with node 16 on Chrome 104

1. `npm install`
2. `npm run dev`
3. Navigate to http://localhost:3000

## Usage Instructions
1. Enter the coordinates of the chunk you want to cluster in the `Cluster Target` input, and select the hashmap size.
2. Use the `View Target` controls to adjust the chunk map view until valid cluster candidates are in view (marked in red)
3. Click `Add chunks to cluster` to add the currently in view candidates to the cluster
4. Continue adjusting the view and adding chunks to the cluster until satisfied.

## Working around the 1.8 Hash Function
While I have no experience analyzing or designing hash functions, it seems obvious to me that the 1.8 chunk hashmap seems to use a particularly bad one. Specifically, it does a terrible job of distributing chunks, so you end up with naturally occuring groups of chunks with the same hash. This will likely turn out to be handy for building in survival, but does come with a drawback. You can't create a cluster anywhere you want, you have to use one of these groups. **Given a random cluster target and search area (view target and view range), you will in general NOT find any candidate chunks.**

One way to find candidate chunks is to start by looking around the cluster target, specificaly on the diagonals. It appears that there are always groups relatively close (a few hundred chunks apart) diagonally away from each other, although the spacing and shape may vary.
