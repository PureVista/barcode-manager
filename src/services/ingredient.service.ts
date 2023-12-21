import { Filter, UpdateFilter } from 'mongodb';
import { Ingredient, IngredientWithId, Ingredients } from '../models';

export class IngredientService {
  findAll = async (query: Filter<IngredientWithId>): Promise<IngredientWithId[]> => {
    const ingredients = await Ingredients.find(query ?? {}).toArray();
    return ingredients;
  };

  findOne = async (query: Filter<IngredientWithId>): Promise<IngredientWithId | null> => {
    const ingredient = await Ingredients.findOne(query);
    return ingredient;
  };

  create = async (_ingredient: Ingredient): Promise<IngredientWithId> => {
    const ingredient = Ingredient.parse(_ingredient);
    const insertedIngredient = await Ingredients.insertOne({ ...ingredient });
    return { _id: insertedIngredient.insertedId, ...ingredient };
  };

  updateOne = async (params: IngredientWithId, update: UpdateFilter<IngredientWithId>): Promise<IngredientWithId> => {
    const ingredient = Ingredient.parse(params);
    const updatedIngredient = await Ingredients.updateOne({ _id: params._id }, update);
    if (!updatedIngredient.upsertedId) throw new Error('There is an error with updating!');
    return { _id: updatedIngredient.upsertedId, ...ingredient };
  };

  createMany = async (_ingredients: Ingredient[]): Promise<IngredientWithId[]> => {
    const ingredients: IngredientWithId[] = [];
    for await (const _ingredient of _ingredients) {
      const pastIngredient = await Ingredients.findOne({ name: _ingredient.name });
      if (pastIngredient) {
        ingredients.push(pastIngredient);
        continue;
      }
      const ingredient = Ingredient.parse(_ingredient);
      const newIngredient = await Ingredients.insertOne(ingredient);
      ingredients.push({ ...ingredient, _id: newIngredient.insertedId });
    }
    return ingredients;
  };
}
