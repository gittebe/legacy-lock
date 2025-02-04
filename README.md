# 🔒 Legacy Lock 

Legacy Lock is a Virtual Time Capsule app that allows users to create and store messages or media (photos, videos, text) that are to be unlocked at a future date. 

Authentication ensures that only authorized people can access the content, providing a secure and personal experience for users to preserve memories or send time-locked messages.

---

## 🛠 Technology Stack  

### **Frontend:**  
- **React** for UI.  

### **Backend:**  
- **Node.js** with **Express** for API.  

### **Database:**  
- **MongoDB** for data storage.  

### **Libraries & Tools:**  
- **React Router** for navigation.  
- **Zustand** for global state management.  

---

## 🪝 Hooks  

### **Internal Hooks (Built-in React or Custom):**  
- **`useState`** – Built-in React hook for state management.  
- **`useEffect`** – Built-in React hook for handling side effects.  
- **`useMemo`** – Built-in React hook that stores the filtered and sorted capsule list to avoid recalculations on every render. 
- It filters out only future capsules (openAt > now), and sorts capsules in ascending order (soonest first).  
- **`useCapsuleStatus`** – Custom hook to calculate the time left on locked capsules.  
- **`useConfetti`** – Custom hook for handling the confetti effect.  
- **`useValidation`** – Custom hook to validate form fields in `CreateCapsule` form.  
 
### **External Hooks (from installed libraries):**
  - **`useNavigate`**– Comes from react-router-dom (for navigation)
  - **`useStore`** – Comes from zustand (global state management)
  - **`useRef`** - For file uploading using Cloud storage. 
  - **`useWindowSize`** – Comes from react-use. It dynamically gets the window width and height, ensuring that Confetti fills the entire screen.
    ```bash
    npm install react-use
    ```
    [Read more about `useWindowSize`](https://github.com/streamich/react-use/blob/HEAD/docs/useWindowSize.md)

---

## 📚 External Libraries


### **Date Handling:** 
  - **`date-fns`** for date formatting and calculations. 
    ```bash
    npm install date-fns
    ```
    [Read more about `date-fns`](https://www.npmjs.com/package/date-fns)
### **File Upload Handling:** 
  - **`multer`** for handling file uploads (media files like photos and videos).
    ```bash
    npm install multer
    ```
    [Read more about `multer`](https://www.npmjs.com/package/multer)
### **Animations and effects:** 
  - **`framer-motion`**  for animations, like the shake effect used in WarningPopup.
    ```bash
    npm install framer-motion
    ```
    [Read more about `framer-motion`](https://motion.dev/docs/react-quick-start)  

  - **`react-confetti`** is a confetti effect that is triggered when the latest locket opens. 
    ```bash
    npm install react-confetti
    ```
    [Read more about `react-confetti`](https://www.npmjs.com/package/react-confetti)

## **☁️ Cloud storage** 
   Cloudinary is used for Media handling.

  [Read more about `Cloudinary`](https://technigo.notion.site/Cloudinary-6e50a871c3844378ad235a5746298349)

## View it live

[Legacy Lock App](https://legacy-locket.netlify.app/)