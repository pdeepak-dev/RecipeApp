import { Ingredient } from '@vue/models';

export class Recipe {
  constructor(public id: number, public name: string, public description: string,
    public imagePath: string, public ingredient: Ingredient[]) {
  }
}
