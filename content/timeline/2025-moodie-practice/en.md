---
title: "Work practice: Moodie"
summary: "Work practice as a Full-stack Developer: a mobile prototype for iPhone and Android."
---

In summer 2025, I completed an internship as a Full-stack Developer and built a working prototype of the Moodie mobile app.

Moodie is an app for teenagers that helps them track their emotional state, talk with an AI assistant, and receive gentle support inside a safe digital space.

The team consisted of students, so in addition to development I took part in decisions around architecture, technology stack, and design. I also brought a designer into the team so the project could have a clear visual direction and a more consistent user experience from the beginning.

We chose Flutter because the app needed to work on both iPhone and Android. For the backend, we used Firebase and Firestore: this stack works well with Flutter and makes it possible to build an MVP quickly.

The access model included admin, owner, teacher, and student roles. The owner could create teacher profiles, and teachers could create student profiles. Students joined the app with a one-time code and signed in anonymously through Firebase Anonymous Authentication, using a temporary user session instead of a regular account and password.

The internship lasted 10 weeks. After the first four weeks, the team composition changed, and I took responsibility for the final implementation. During the remaining six weeks, I rebuilt the app from scratch: I kept the already discussed ideas, architecture decisions, and some screens as a foundation, but completed the working codebase, interface flows, integrations, and test builds myself.

In the project, I worked with Flutter, Dart, MVVM, Firebase Authentication, Firestore, Cloud Functions, Secret Manager, Hive, OpenAI API, localization, light and dark themes, notifications, and iOS/Android configuration.

Mobile testing and build preparation became a separate part of the internship. I learned how to run iOS testing through TestFlight, and also configured Android testing for the app.

During the internship, I not only learned a new stack but also strengthened my ability to build software with AI tools. I paid special attention to a privacy-first approach, GDPR, and European Union requirements for apps that handle sensitive user data.
