import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[vuePlaceholder]'
})
export class PlaceholderDirective {
    constructor(public vcRef: ViewContainerRef) {
    }
}