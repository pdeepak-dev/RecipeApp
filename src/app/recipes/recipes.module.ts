import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

import { SharedModule } from "../shared/shared.module";
import { RecipesRoutingModule } from "./recipes-routing.module";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        ReactiveFormsModule, RecipesRoutingModule, SharedModule
    ]
})
export class RecipesModule {
}