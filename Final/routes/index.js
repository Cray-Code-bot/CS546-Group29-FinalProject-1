//import userRoutes from './users.js';

import path from 'path';
import auth_routes from "./auth_routes.js";

const constructorMethod = (app) => {

  app.get('/about', (req, res) => {
    res.sendFile(path.resolve('static/about.html'));
  });

  app.use("/", auth_routes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};
export default constructorMethod;

