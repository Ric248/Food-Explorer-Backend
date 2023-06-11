const knex = require ('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require("../providers/DiskStorage")

class DishesAdminController{
  async show(request, response){
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();

    const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");

    return response.status(200).json({ ...dish, ingredients });
  }

  async index(request, response){
    const { title, ingredients } = request.query;

    let dishes

    if(ingredients){
      const filteredIngredients = ingredients.split(',').map(ingredient => ingredient.trim())

      dishes = await knex("ingredients")
      .select([
        "dishes.id",
        "dishes.title",
        "dishes.price",
        "dishes.category",
        "dishes.image",
        "dishes.price"
      ])
      .whereLike("dishes.title", `%${title}%`)
      .whereIn("name", filteredIngredients)
      .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
      .orderBy("dishes.title")

    } else{
    dishes = await knex("dishes")
    .whereLike("title", `%${title}%`)   
  }

  const dishesIngredients = await knex("ingredients") 
  const dishesWithIngredients = dishes.map(dish => {
    const dishIngredient = dishesIngredients.filter(ingredient => ingredient.dish_id === dish.id);

    return { ...dish, ingredients: dishIngredient }
  })

  return response.status(200).json(dishesWithIngredients);
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

  async delete(request, response){
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.status(204).json();
  }

  async update(request, response){
    console.log("Entrou no update");
    const { title, description, category, image, price, ingredientString } = request.body;
    const ingredients = ingredientString.split(",");
    const { id } = request.params;
    console.log(id, title, description, category, image, price, ingredients); // -------------------------------------------------------------------
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