import express from "express";
import bodyParser from "body-parser";
import initServices from "./initServices";
import rateLimit from "express-rate-limit";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: +process.env.MAX_REQUEST || 10, // limit each IP to 10 requests per windowMs
  })
);

const services = initServices(console);

Object.values(services).map((service) => {
  app.use(service);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    port,
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
