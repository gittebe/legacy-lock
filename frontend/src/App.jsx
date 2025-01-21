import { BrowserRouter as Router } from "react-router-dom";
import useStore from "./store/store"; // Assuming you are using state management solution
import { RoutesConfig } from "./routes/RoutesConfig";

const App = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn) ?? false; // Check if the user is logged in

  return (
    <Router>
      {/* Pass the isLoggedIn state to RoutesConfig component */}
      <RoutesConfig isLoggedIn={isLoggedIn} />
    </Router>
  );
};

export default App;