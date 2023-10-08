import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '@vue/models';

import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'vue-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];

  subscription: Subscription;

  constructor(private slService: ShoppingListService) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();

    this.subscription = this.slService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

}
