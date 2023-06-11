const { Router } = require('express');

const usersRoutes = require('./users.routes');
const dishesAdminRoutes = require('./dishesAdmin.routes');
const sessionsRoutes = require('./sessions.routes');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/adminDishes', dishesAdminRoutes);
routes.use('/sessions', sessionsRoutes);

module.exports = routes;