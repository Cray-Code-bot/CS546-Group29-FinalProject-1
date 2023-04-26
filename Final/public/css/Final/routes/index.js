import userRoutes from './users.js';
import path from 'path';

const constructorMethod = (app) => {
    app.get('/about', (req, res) => {
      res.sendFile(path.resolve('static/about.html'));
    });
    app.use('*', (req, res) => {
      res.redirect('/posts');
    });
  };
  
  export default constructorMethod;