//import userRoutes from './users.js';
import housesRouter from './houses.js';
import reviewsRoutes from './reviews.js';
import path from 'path';
import express from "express";
import auth_routes from "./auth_routes.js";

const constructorMethod = (app) => {
  app.use('/houses', housesRouter);
  app.use('/reviews', reviewsRoutes);
  //app.use(express.static('../Final/static')); 
  app.use('/about', (req, res) => {
    res.render("about", {title: "About Us", demopic: "../Final/static/demopic.jpg"});
  });

  app.use("/", auth_routes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};
export default constructorMethod;

