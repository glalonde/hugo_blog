---
title: "Spout"
date: 2026-10-28
draft: false
summary: "An arcade game that runs in your browser. [Try it right now →](https://glalonde.github.io/spout/)"
photoEssay: true
featuredAlt: "A small blue ship fires a bright plume of exhaust into glowing orange terrain."
build:
  publishResources: false
---

Spout is an arcade game I'm building in Rust. You steer a small ship through a destructible landscape, trying to climb before the timer runs out.

The exhaust is the interesting part. The same particles that trail behind the ship eat away at the terrain. Turning changes both where you're going and where you're digging. Sometimes making room to move means pointing yourself somewhere inconvenient.

The rules are simple: height determines your score, and reaching the next level adds time to the clock. The challenge is keeping the ship under control while opening a path upward.

Most of the visual activity happens on the GPU: particles move, collide with the terrain, and wear it away. Rust and wgpu let the game run both as a desktop application and in the browser. The glow makes the whole thing look a little like flying through hot embers.

[Play Spout](https://glalonde.github.io/spout/) in a browser with WebGPU support. Use **W** or **↑** to thrust, and **A/D** or **←/→** to rotate.

The [source is on GitHub](https://github.com/glalonde/spout).
