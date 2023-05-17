const { Router } = require('express');

const UsersController = require("../controllers/UsersController")

const usersRoutes = Router();

// Instanciando as classes
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;