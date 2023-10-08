import { Subscription } from 'rxjs';
import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';

import { Recipe } from '@vue/models';

import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'vue-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subcription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subcription = this.recipeService.recipesChanged.subscribe(recipes => this.recipes = recipes);
  }

  public onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }

}
