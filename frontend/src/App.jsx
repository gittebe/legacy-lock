import { BrowserRouter as Router } from "react-router-dom";
import useStore from "./store/store"; 
import { RoutesConfig } from "./routes/RoutesConfig";
import { useEffect } from "react";

const App = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn) ?? false; 
  
  return (
    <Router>
      {/* Pass the isLoggedIn state to RoutesConfig component */}
      <RoutesConfig isLoggedIn={isLoggedIn} />
    </Router>
  );
};

export default App;