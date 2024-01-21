import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import express from "express";
import "dotenv/config";

import usersRouter from "../src/routes/users.js";
import eventsRouter from "../src/routes/events.js";
import categoriesRouter from "../src/routes/categories.js";
import loginRouter from "../src/routes/login.js";
import log from "./middleware/log.js";
//import jwtCheck from "./utils/jwtCheck.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

Sentry.init({
  dsn: "https://8446b6da04b1e933392ef5991cf1b9e4@o4506311320600576.ingest.sentry.io/4506345002172416",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// ***All middleware***
app.use(express.json());
//app.use(jwtCheck);
app.use(log);

app.use("/users", usersRouter);
console.log("services user is called");
app.use("/events", eventsRouter);
console.log("services event is called");
app.use("/categories", categoriesRouter);
console.log("services cat. is called");
app.use("/login", loginRouter);
console.log("login is called");

// app.get("/debug-sentry", function mainHandler(req, res) {
//   console.log("error sentry debugging is called");
//   throw new Error("My first Sentry error!");
// });

// app.get("/authorized", function (req, res) {
//   console.log("authorization 1 is called");
//   res.send("Secured Resource");
// });
// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
console.log("sentry error handler is called");
app.use(errorHandler);
console.log("app errorHandler is called");
// Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(res.sentry + "\n");
// });

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
