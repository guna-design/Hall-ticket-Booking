const express = require("express");

const AppRoutes = require("./src/routes");

const app = express();

app.use(express.json());
app.use("/", AppRoutes);

app.listen(8000, () => console.log("Server is listening to the port 8000"));
