import express from "express";
const app = express();
import morgan from "morgan";
import bodyParser from "body-parser";
import { housesData as data } from "./data/index.js";
import housesRoutes from "./routes/houses.js";
import configRoutes from "./routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exphbs from "express-handlebars";
import session from "express-session";
import path from 'path';
import Handlebars from 'handlebars';
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
//app.use(express.static('../Final/static')); 
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/public", staticDir);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
Handlebars.registerHelper('if_eq', function(a, b, opts) {
  if (a === b) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});

app.use(
  session({
    name: "AuthCookie",
    secret: "That-group_which-shall_not-be-named",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 6000000 },
  })
);

app.get('/', (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/about');
  } else {
    res.redirect('/dashboard');
  }
});

app.use("/register", (req, res, next) => {
  if (req.session.user) {
    res.redirect("/dashboard");
  } else {
    next();
  }
});

app.use("/login", (req, res, next) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    next();
  }
});

app.use("/dashboard", (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
});

app.use("/houses", (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
})

app.use("/reviews", (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    next();
  }
})

app.use("/logout", (req, res, next) => {
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
