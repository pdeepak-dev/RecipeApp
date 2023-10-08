import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Ingredient } from '@vue/models';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'vue-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(index => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  public onSubmit(f: NgForm) {
    const value = f.value;

    if (this.editMode)
      this.slService.updateIngredient(this.editedItemIndex, new Ingredient(value.name, value.amount));
    else
      this.slService.addIngredient(new Ingredient(value.name, value.amount));

    this.editMode = false;
    f.reset();
  }

  public onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  public onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
