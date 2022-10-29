import express, { response } from "express";
import router from "./routes/users.js";

const app = express();
const PORT = "3000";

app.use(express.json());

app.use("/users", router);

app.get("/", (request, respond) => {
  respond.json({ message: "hello world" });
});

app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost:${PORT}`)
);
