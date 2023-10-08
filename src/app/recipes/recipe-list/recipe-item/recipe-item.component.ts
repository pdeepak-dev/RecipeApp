import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '@vue/models';

@Component({
  selector: 'vue-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() {
  }

  ngOnInit(): void {
  }
}
