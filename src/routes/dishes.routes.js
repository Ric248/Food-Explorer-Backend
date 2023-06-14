const { Router } = require('express');

const multer = require('multer');
const uploadConfig = require('../configs/upload')

const DishesController = require('../controllers/DishesController');

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const dishesController = new DishesController();

dishesRoutes.get('/', dishesController.index);
dishesRoutes.get('/:id', dishesController.show);
dishesRoutes.delete('/:id', dishesController.delete);
dishesRoutes.post('/', upload.single("image"), dishesController.create);
dishesRoutes.put("/:id", upload.single("image"), dishesController.update);

module.exports = dishesRoutes;