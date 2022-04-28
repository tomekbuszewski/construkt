import * as express from "express";

export const app = express();

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to backend!" });
});

const port = process.env.BACKEND_PORT || 3333;
const server = app.listen(port, () => {
  if (process.env.NODE_ENV !== "test") {
    console.log(`Listening at http://localhost:${port}/api`);
  }
});
server.on("error", console.error);
