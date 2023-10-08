import { Injectable } from '@angular/core';

import { Ingredient, Recipe } from '@vue/models';

import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(1, 'A Test Recipe 1', 'This is a test',
  //     'https://www.vegrecipesofindia.com/wp-content/uploads/2017/08/sabudana-payasam-recipe.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe(2, 'A Test Recipe 2', 'This is a test',
  //     'https://www.vegrecipesofindia.com/wp-content/uploads/2021/08/corn-soup-01.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ]),
  //   new Recipe(3, 'A Test Recipe 3', 'This is a test',
  //     'https://www.vegrecipesofindia.com/wp-content/uploads/2009/08/paneer-bhurji-4.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ]),
  //   new Recipe(4, 'A Test Recipe 4', 'This is a test',
  //     'https://www.vegrecipesofindia.com/wp-content/uploads/2011/10/grilled-paneer-tikka.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ]),
  //   new Recipe(5, 'A Test Recipe 5', 'This is a test',
  //     'https://www.vegrecipesofindia.com/wp-content/uploads/2016/07/curd-rice-5.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ]),
  // ];

  private recipes: Recipe[] = [];
  
  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged?.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes.find(r => r.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(newRecipe: Recipe) {
    newRecipe.id = this.getNextId();
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    let existingRecipe = this.recipes[index - 1];
    newRecipe.id = existingRecipe.id;
    this.recipes[index - 1] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index - 1, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  private getNextId() {
    return (Math.max(...this.recipes.map(x => x.id)) + 1);
  }

}
