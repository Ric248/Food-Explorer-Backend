const knex = require ('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require("../providers/DiskStorage")


class DishesAdminController{
  async create(request, response) {
    const {title, description, category, price, ingredients} = request.body;
    const checkDishAlreadyExist = await knex("dishes").where({title}).first();
  
    if(checkDishAlreadyExist){
      throw new AppError("Este prato já existe em nossa database")
    }
    
    const dishFilename = request.file.filename;
    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(dishFilename);
    
    const dish_id = await knex("dishes").insert({ title, description, category, price, image: filename });

    const ingredientsInsert = ingredients.map(ingredient => {
      return{ name: ingredient, dish_id }
    });
  
    await knex("ingredients").insert(ingredientsInsert)
  
    return response.status(201).json()
  }

  async delete(request, response){
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.status(204).json();
  }

  async update(request, response){
    const { title, description, category, image, price, ingredients } = request.body;
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    if(!dish){
      throw new AppError("O prato que você está tentando atualizar não existe")
    }

    dish.title = title ?? dish.title;
    dish.description = description ?? dish.description;
    dish.category = category ?? dish.category;
    dish.image = image ?? dish.image;
    dish.price = price ?? dish.price;  

    await knex("dishes").where({ id }).update(dish)
    await knex("dishes").where({ id }).update("updated_at", knex.fn.now())

    const hasOnlyOneIngredient = typeof(ingredients) === "string";

    let ingredientsInsert
    if (hasOnlyOneIngredient) {
      ingredientsInsert = {
      dish_id: dish.id,
      name: ingredients
      }
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map(ingredient => {
      return {
        dish_id: dish.id,
        name : ingredient
      }
      })
      
      await knex("ingredients").where({ dish_id: id}).delete()
      await knex("ingredients").where({ dish_id: id}).insert(ingredientsInsert)
    }


    return response.status(202).json('Prato atualizado com sucesso')
  }
}

module.exports = DishesAdminController;