import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map, tap } from "rxjs";

import { Recipe } from "../recipes/recipe.model";

import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  recipeBookFirebaseUrl = 'https://ng-recipe-book-ea8e1-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(this.recipeBookFirebaseUrl, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(this.recipeBookFirebaseUrl)
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredient: recipe.ingredient ? recipe.ingredient : []}
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));
  }
}
