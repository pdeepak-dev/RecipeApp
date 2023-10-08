import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '@vue/models';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'vue-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private router: Router, private route: ActivatedRoute,
    private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.recipe = this.recipeService.getRecipe(+params['id']));
  }

  public onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredient);
  }

  public onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.recipe.id, 'edit'], { relativeTo: this.route });
  }

  public onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['/recipes']);
  }

}
