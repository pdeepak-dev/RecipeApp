import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule.forChild([
            {
                path: '', component: ShoppingListComponent
            }
        ]),
        FormsModule,
        SharedModule
    ],
    exports: [
        RouterModule
    ]
})
export class ShoppingListModule {
}