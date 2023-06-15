const knex = require ('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require("../providers/DiskStorage")

class DishesController{
  async show(request, response){
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

    return response.status(200).json({ ...dish, ingredients });
  }

  async index(request, response){
    const { search } = request.query;

    const searchTitle = await knex("dishes").whereLike("title", `%${search}%`)
    const searchDishes = searchTitle.map(dish => {return { ...dish }})

    const listIngredients = await knex("ingredients").whereLike("name", `%${search}%`)
    const dishIds = listIngredients.map(ingredient => ingredient.dish_id)
    const dishes = await knex("dishes")
    const searchIngredients = dishIds.map(dishId => dishes.filter(dish => dish.id === dishId))

    const searchResult = searchDishes.concat(...searchIngredients)

    return response.status(200).json(searchResult);
  }

  async create(request, response) {
    const {title, description, category, price, ingredientString} = request.body;
    const ingredients = ingredientString.split(",");

    const checkDishAlreadyExist = await knex("dishes").where({title}).first();

    if(checkDishAlreadyExist){
      throw new AppError("Este prato já existe em nossa database")
    }

    const dishFilename = request.file.filename;
    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(dishFilename);
    
    const [dish_id] = await knex("dishes").insert({ title, description, category, price, image: filename });

    const ingredientsInsert = ingredients.map(ingredient => {
      return{ name: ingredient, dish_id }
    });

    await knex("ingredients").insert(ingredientsInsert)

    return response.status(201).json()
  }

  async update(request, response) {
    const { title, description, category, price, ingredientString } = request.body;
    const ingredients = ingredientString.split(",");
    const { id } = request.params;
    const dish = await knex("dishes").where({ id }).first();
    const oldImage = dish.image;

    if(!dish){
      throw new AppError("O prato que você está tentando atualizar não existe")
    };

    const diskStorage = new DiskStorage();
    const newImage = request.file.filename;

    if(newImage) {
      await diskStorage.deleteFile(oldImage);
    }

    const filename = await diskStorage.saveFile(newImage);

    dish.title = title ?? dish.title;
    dish.description = description ?? dish.description;
    dish.category = category ?? dish.category;
    dish.price = price ?? dish.price;
    dish.image = filename ?? dish.image;

    await knex("dishes").where({ id }).update(dish)

    const ingredientsInsert = ingredients.map(ingredient => {
      return{ name: ingredient, dish_id: id };
    });

    await knex("ingredients").where({ dish_id: id}).delete();
    await knex("ingredients").insert(ingredientsInsert);

    return response.status(202).json('Prato atualizado com sucesso');
  }

  async delete(request, response){
    const { id } = request.params;
    const dish = await knex("dishes").where({ id }).first();

    const diskStorage = new DiskStorage();

    await diskStorage.deleteFile(dish.image);
    await knex("dishes").where({ id }).delete();

    return response.status(204).json();
  }
}

module.exports = DishesController;