# Legacy Lock 

Legacy Lock is a Virtual Time Capsule app that allows users to create and store messages or media (photos, videos, text) that are to be unlocked at a future date. 

Authentication ensures that only authorized people can access the content, providing a secure and personal experience for users to preserve memories or send time-locked messages.

## Technology Stack 

Frontend: React
Backend: Node.js with Express
Database: MongoDB.
Libraries: 
  - React Router for navigation
  - Zustand for global state management.
React Hooks: useState, useEffect, useContext, and custom hooks to manage and validate user data and content.
  ### 🧠 useMemo (in LatestLocket.jsx)
  `useMemo` is a built-in React hook. 
    * - useMemo stores the filtered and sorted capsule list to avoid recalculations on every render.
    * - Filters out only future capsules (openAt > now)
    * - Sorts capsules in ascending order (soonest first)

External Libraries:
date-fns for date handling and formatting
multer for handling file uploads (for media files like photos and videos)

### 🧠 useMemo (in LatestLocket.jsx)
`useMemo` is a built-in React hook. 
  * - useMemo stores the filtered and sorted capsule list to avoid recalculations on every render.
  * - Filters out only future capsules (openAt > now)
  * - Sorts capsules in ascending order (soonest first)

### Shake effect (used in WarningPopup)
  ```bash
  npm install framer-motion
  ```
  
  The WarningPopup uses a shake effect to visually indicate that the capsule is not yet available.
  
  Read more: https://motion.dev/docs/react-quick-start

### Confetti (in useConfetti hook)
  ```bash
  npm install react-confetti
  ```
  Triggered when the latest locket opens and runs for 6 seconds before stopping.

  Read more: https://www.npmjs.com/package/react-confetti

### useWindowSize
  ```bash
  import { useWindowSize } from "react-use";
  ```
  This hook dynamically gets the window width and height, ensuring that Confetti fills the entire screen.

  Read more: https://github.com/streamich/react-use/blob/HEAD/docs/useWindowSize.md

## View it live

[Legacy Locket App](https://legacy-locket.netlify.app/)