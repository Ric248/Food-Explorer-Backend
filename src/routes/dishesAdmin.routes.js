const { Router } = require('express');

const multer = require('multer');
const uploadConfig = require('../configs/upload')

const DishesAdminController = require('../controllers/DishesAdminController');
const DishImageController = require('../controllers/DishImageController')

const dishesAdminRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const dishesAdminController = new DishesAdminController();
const dishImageController = new DishImageController()

dishesAdminRoutes.get('/', dishesAdminController.index);
dishesAdminRoutes.get('/:id', dishesAdminController.show);
dishesAdminRoutes.delete('/:id', dishesAdminController.delete);
dishesAdminRoutes.post('/', upload.single("image"), dishesAdminController.create);
dishesAdminRoutes.put("/:id", upload.single("image"), dishesAdminController.update);

module.exports = dishesAdminRoutes;