---
title: Untitled multiplayer game
date: 2026-07-18
---

A fighting game, but mostly a tech demo. Built for fun because I wanted to work with WebRTC and rollback netcode.

The game is deterministic and runs at a fixed tick rate. Rendering is interpolated between game states, so it looks smooth on any display regardless of Hz.

That structure let me build what turned out to be the most useful part of the project: a debugger similar to video editing software. It can snapshot, replay, rewind, and scrub through a timeline of game state. When I hit obscure bugs, I could just snapshot the state and replay the bug on loop until I figured it out.

Written without any dependencies or build system.

![](./Screenshot_2026-06-14_18-36-59.png)
