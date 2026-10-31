import fs from 'fs';

// Simple mockup of THREE.Vector3 to allow running in plain Node
class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  distanceTo(v) {
    const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
}

// Replicate the nodes generation logic
const nodeCount = 22; // From App.jsx:136
const nodes = [];
for (let i = 0; i < nodeCount; i++) {
  const x = (Math.random() - 0.5) * 18;
  const y = (Math.random() - 0.5) * 13;
  const z = (Math.random() - 0.5) * 9;
  nodes.push(new Vector3(x, y, z));
}

// But let's test a larger number of nodes for meaningful benchmark
const bigNodes = [];
for (let i = 0; i < 2000; i++) {
  const x = (Math.random() - 0.5) * 18;
  const y = (Math.random() - 0.5) * 13;
  const z = (Math.random() - 0.5) * 9;
  bigNodes.push(new Vector3(x, y, z));
}

function uncached(nodesArray) {
  const connections = [];
  const maxDistance = 6.8;
  let count = 0;
  for (let i = 0; i < nodesArray.length; i++) {
    for (let j = i + 1; j < nodesArray.length; j++) {
      const dist = nodesArray[i].distanceTo(nodesArray[j]);
      if (dist < maxDistance) {
        count++;
      }
    }
  }
  return count;
}

function cached(nodesArray) {
  const connections = [];
  const maxDistance = 6.8;
  let count = 0;
  const numNodes = nodesArray.length;
  for (let i = 0; i < numNodes; i++) {
    for (let j = i + 1; j < numNodes; j++) {
      const dist = nodesArray[i].distanceTo(nodesArray[j]);
      if (dist < maxDistance) {
        count++;
      }
    }
  }
  return count;
}

const N = 1000;
let t0, t1;

// Warmup
uncached(bigNodes);
cached(bigNodes);

t0 = performance.now();
for (let i = 0; i < N; i++) uncached(bigNodes);
t1 = performance.now();
const timeUncached = t1 - t0;

t0 = performance.now();
for (let i = 0; i < N; i++) cached(bigNodes);
t1 = performance.now();
const timeCached = t1 - t0;

console.log(`Uncached: ${timeUncached.toFixed(2)} ms`);
console.log(`Cached:   ${timeCached.toFixed(2)} ms`);
console.log(`Improvement: ${((timeUncached - timeCached) / timeUncached * 100).toFixed(2)}%`);
