const AppError = require('../utils/AppError');

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    response.status(201).json({ name, email, password });
  }
}

module.exports = UsersController;