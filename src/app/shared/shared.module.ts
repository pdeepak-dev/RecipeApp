import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./directives/dropdown.directive";
import { Dropdown2Directive } from "./directives/dropdown2.directive";
import { PlaceholderDirective } from "./directives/placeholder.directive";
import { UnlessDirective } from "./directives/unless.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        UnlessDirective,
        DropdownDirective,
        Dropdown2Directive,
        PlaceholderDirective,
        AlertComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        UnlessDirective,
        DropdownDirective,
        Dropdown2Directive,
        PlaceholderDirective,
        AlertComponent,
        CommonModule,
        LoadingSpinnerComponent
    ]
})
export class SharedModule {
}