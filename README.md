# Final Project

Replace this readme with your own information about your project.

Start by briefly describing the assignment in a sentence or two. Keep it short and to the point.

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

## The problem

Describe how you approached to problem, and what tools and techniques you used to solve it. How did you plan? What technologies did you use? If you had more time, what would be next?

## View it live

Every project should be deployed somewhere. Be sure to include the link to the deployed project so that the viewer can click around and see what it's all about.