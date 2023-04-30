import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exphbs from "express-handlebars";
import session from "express-session";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + "/public");

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 },
  })
);


app.use("/register", (req, res, next) => {
  console.log(req.session.id);
  if (req.session.user) {
    if (req.session.user.role == "admin") {
      res.redirect("/admin");
    }
    if (req.session.user.role == "user") {
      res.redirect("/protected");
    }
  } else {
    next();
  }
});

app.use("/login", (req, res, next) => {
  console.log(req.session.id);
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    next();
  }
});

app.use("/dashboard", (req, res, next) => {
  console.log(req.session.id);
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
});

app.use("/protected", (req, res, next) => {
  console.log(req.session.id);
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
});

app.use("/admin", (req, res, next) => {
  console.log(req.session.id);
  if (req.session.user) {
    if (req.session.user.role == "admin") {
      next();
    } else {
      res.status(403).redirect("/error", { user: req.session.user });
    }
  } else {
    res.redirect("/login");
  }
});

app.use("/logout", (req, res, next) => {
  console.log(req.session.id);
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
});

app.use((req, res, next) => {
  let timeStamp = new Date().toUTCString();
  let reqMethod = req.method;
  let reqRoute = req.originalUrl;

  if (req.session.user) {
    console.log(
      timeStamp + ":" + reqMethod + "/" + reqRoute + "(Authenticated User)"
    );
  } else {
    console.log(
      timeStamp + ":" + reqMethod + "/" + reqRoute + "(Non-Authenticated User)"
    );
  }
  next();
});




configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
