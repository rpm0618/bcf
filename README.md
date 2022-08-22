# Browser Cluster Finder

## What is this?
A (very) WIP browser based cluster finder for creating delay in Minecraft threadstone related exploits. It currently targets Minecraft 1.8, but aims to eventually support 1.12 as well.

## Quickstart
Tested with node 16 on Chrome

1. `npm install`
2. `npm run dev`
3. Navigate to http://localhost:3000

## Usage Instructions
1. Enter the coordinates of the chunk you want to cluster in the `Cluster Target` input, and select the hashmap size.
2. Use the `View Target` controls to adjust the chunk map view until valid cluster candidates are in view (marked in red)
3. Click `Add chunks to cluster` to add the currently in view candidates to the cluster
4. Continue adjusting the view and adding chunks to the cluster until satisfied.

## Working around the 1.8 Hash Function
I'm not an expert at these things, but it appears to me that the 1.8 hash function is capital B Bad. There are very obvious patterns present, and chunks with the same hash will often be grouped close together geographically. The result is that **for a given cluster target chunk and a random (but reasonable) viewing target and distance, there's a decent chance there will be no candidate cluster chunks.**

One way to find candidate chunks is to start looking around the cluster target. It appears there will always be a number of chunks with the same hash around the target chunk, and there will also be repeating patterns of candidate chunks on the diagonals from that location.
