import { Body, Controller, Get, Patch, Post, Req, Res } from 'routing-controllers';
import { Request, Response } from 'express';

import { ArrayResponse, ObjectResponse } from '..';
import { IngredientService } from '../../services';
import { IngredientWithId, Ingredients } from '../../models';
import { ObjectId } from 'mongodb';

@Controller('/ingredients')
export class IngredientsController {
  constructor(private ingredientService: IngredientService) {
    this.ingredientService = new IngredientService();
  }

  @Get()
  public async getAllIngredients(
    @Res() res: Response<ArrayResponse<IngredientWithId>>
  ): Promise<Response<ArrayResponse<IngredientWithId>>> {
    try {
      const ingredients = await this.ingredientService.findAll({});
      return res.status(200).send({ result: ingredients });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }

  @Post('/getWithIds')
  async getWithIds(
    @Body() body: { ids: ObjectId[] },
    @Res() res: Response<ArrayResponse<IngredientWithId>>
  ): Promise<Response<ArrayResponse<IngredientWithId>>> {
    try {
      if (body.ids?.length === 0) return res.status(200).send({ result: [] });
      const ids = body.ids.map((id) => new ObjectId(id));
      const ingredients = await this.ingredientService.findAll({ _id: { $in: ids } });
      return res.status(200).send({ result: ingredients });
    } catch (error: any) {
      return res.status(400).send(error);
    }
  }

  @Patch('/:id')
  public async setApproved(
    @Req() request: Request,
    @Res() res: Response<ObjectResponse<IngredientWithId>>
  ): Promise<Response<ObjectResponse<IngredientWithId>>> {
    try {
      const updatedIngredient = await Ingredients.findOneAndUpdate(
        { _id: new ObjectId(request.params._id) },
        { $set: { isApproved: true } },
        { returnDocument: 'after' }
      );
      return res.status(200).send({ result: updatedIngredient });
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  }
}
