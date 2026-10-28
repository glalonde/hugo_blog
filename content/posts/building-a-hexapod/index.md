---
title: "Building a Hexapod"
date: 2026-10-28
draft: false
summary: "Designing a small walking robot, starting with one leg."
photoEssay: true
featuredAlt: "An isometric CAD view of the complete hexapod design, with six curved metal legs, black servos, and colorful wiring around the central chassis."
build:
  publishResources: false
---

*The current robot design in the CAD viewer. Physical fit and movement under load still need testing.*

I'm working on a small hexapod: a robot that can scurry across the floor under its own battery power, controlled with a gamepad. The goal is smooth, fluid movement in something compact enough to feel at home on a desk.

So far, the work has been a mix of mechanical design, simulation, and getting the first electronics talking. Fitting the motors, battery, and wiring into a small body is only part of it. The legs also need room to swing without hitting each other or the chassis.

The controller is written in Rust, with shared code running in both a desktop simulator and the robot's firmware. A browser view lets me inspect the motion and look for collisions before committing to hardware. It's useful for finding problems, though a convincing animation doesn't prove the robot can walk.

There has been some real movement: the controller has communicated with a servo and completed a small out-and-back test. It also runs from battery power.

The next milestone is one complete leg, assembled and tested under load. That should tell me much more about the design than another full-robot render. Once that works, the job is to turn it into a walking machine.
