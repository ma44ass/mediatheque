import express from "express";

import "dotenv/config";

import projectsRoutes from "./routes/projets.js";
import adherantsRoutes from "./routes/adherants.js";
import empruntsRoutes from "./routes/emprunts.js";
import livresRoutes from "./routes/livres.js";


const PORT = process.env.PORT;
const app = express();
app.use(express.json());




app.use("/projects", projectsRoutes);
app.use("/adherants", adherantsRoutes);
app.use("/emprunts", empruntsRoutes);
app.use("/livres", livresRoutes);



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});

