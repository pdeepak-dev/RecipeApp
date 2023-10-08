import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'vue-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredient'))
      .push(this.createIngredientFormGroup());
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
    // this.getIngredientFormControl().splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredient) {
        for (let ingredient of recipe.ingredient) {
          recipeIngredients.push(this.createIngredientFormGroup(ingredient.name, ingredient.amount));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredient: recipeIngredients
    });
  }

  getIngredientFormControl() {
    return (<FormArray>this.recipeForm.get('ingredient')).controls;
  }

  createIngredientFormGroup(name: string = '', amount: number = null) {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

}
