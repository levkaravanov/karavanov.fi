---
title: "Work practice: Espoon Biljardikerho ry"
summary: "My first real project: a billiards tournament management system with a tablet interface and automated player distribution."
---

The goal of the work practice was to build a billiards tournament management system for Espoon Biljardikerho ry.

The idea was to create a tablet version that could be placed on the game tables. Players would mark pocketed balls during the match, and the system would calculate results automatically.

For administrators, the project included a separate area for registering players, managing tournaments, and automatically distributing participants by experience level.

The hardest part was not building individual screens. The hard part was the tournament logic: distributing players so that stronger participants were spread evenly through the bracket and would not meet too early.

As the tournament continued, players moved through the bracket according to a specific structure: eliminated players continued playing, weaker players competed with each other, stronger players moved through their side of the bracket, and in the final stage the best players from the weaker division met the best players from the stronger division.

Looking back, I can clearly see the architectural problems. Frontend and backend were mixed together, authentication was mostly nominal, and the structure grew organically. But for a first real project, the main achievement was the attempt to automate complex tournament logic and player distribution.

The project was not ultimately deployed. I worked on it alone, and the client later chose an existing ready-made solution. Still, this experience was important because it showed me the difference between a study exercise and a real system, where the hardest part is often not the code itself but understanding and modeling the domain rules.
