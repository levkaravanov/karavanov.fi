---
title: "DailyHero"
summary: "My own iOS product on the App Store: family tasks, points, rewards, an MCP server, and a product website."
---

DailyHero is my own iOS product for families, published on the App Store. The app helps parents turn a child’s daily tasks into a system of progress, points, and family rewards.

The story behind the app goes back to my own childhood. When I was little, my mother used to write a list of daily tasks in a notebook. In the evening, before bedtime, we would sit down and check what I had done. She gave me points, they accumulated, and later I received a small reward.

When I became a father and my daughter grew older, I started looking for similar services in app stores. There are alternatives, but none of them felt quite right to me. After becoming a developer, I decided to build my own app: one where a parent creates tasks, a child completes them, and rewards become a clear and positive motivation.

### iOS app

DailyHero is primarily built for the parent: they create tasks, review completed work, award points, and manage rewards. There is also a child mode, so the child can see what needs to be done.

The app can be used even with young children who are not yet confident readers. For example, it can help build routines around brushing teeth, washing hands after going outside, or doing other small daily tasks. When a child has a clear goal and a small reward, routine becomes more like a game.

The app is developed with AI agents in Codex, but under my close control: through tasks, documentation, review, and iteration. I first worked through the visual direction, prepared the Figma design, studied iOS best practices, and wrote project documentation.

Before implementation, I described the PRD, architecture, file structure, naming rules, localization, colors, reusable components, skills, and rules for AI agents. It was a lot of preparation for an app that initially looked small: a rewards screen, a tasks screen, and a menu screen.

I like Apple hardware, Apple’s design language, and the feel of native apps. That is why I chose SwiftUI and tried to use as many native Apple components as possible, so the interface would feel familiar and easy to understand.

Firebase is used for the backend and authentication because it gives a clear, secure, and practical infrastructure for an MVP. The project uses Firebase Auth, Anonymous Auth for the child device, Firestore, Cloud Functions, App Check, Security Rules, soft delete, account recovery, localization, and a privacy-first approach.

I also studied GDPR requirements and data storage questions, especially because the app can involve children’s data. Data deletion, consent, privacy, and access limits need to be designed early, before the product grows too far.

DailyHero solves two things for me. First, it is an app I use myself every day. It has become a small tradition with my daughter: before bedtime, we check her completed tasks and add points. Second, it is a serious practical project where I bring together mobile development, backend, security, documentation, and an AI-assisted workflow.

### MCP server

I wanted to add AI functionality to DailyHero, but putting it directly inside the app quickly raises questions around privacy, cost, and control. This matters even more when the data is connected to children.

AI inside the app would need strict boundaries: system prompts, token usage, cost control, and probably paid features. I decided to move this direction into an MCP server instead.

Through MCP, a user can connect their own AI agent or AI chat: ChatGPT, Claude, Cursor, or another client that supports MCP. In the environment they already use, they can discuss routines, find ideas, shape plans, and then save the result into DailyHero as tasks or rewards for a specific child.

I see MCP as a future standard for connecting AI agents to different services. I like the idea itself: the service gives the agent clear tools, while the user stays in the AI interface they already know.

### Website {#dailyhero-website}

The DailyHero website started as a practical requirement. To publish the app on the App Store, I needed a place for the terms of use, safety information, and privacy policy.

At first, it was a simple two-page website for documents. I asked Codex to build it with the app colors and fonts, and the first result turned out better than expected. After that, the website started growing.

I added more sections, light and dark themes, localization, and gradually turned a technical policy page into a full product website: a DailyHero landing page with SEO work and a public product description.
