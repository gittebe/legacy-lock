import express from "express";
import cors from "cors";

import documentationRoutes from "./routes/documentation";
import userRoutes from "./routes/users";


const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

//use the importet routes
app.use("/", documentationRoutes);
app.use("/users", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});