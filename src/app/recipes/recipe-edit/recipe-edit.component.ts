import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    })
  }

  getName(): string {
    return this.recipeService.getRecipe(this.id).name;
  }

  onSubmit(): void {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);

    if (this.editMode)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    else
      this.recipeService.addRecipe(this.recipeForm.value);

    this.router.navigate(['../'], {relativeTo: this.activatedRoute});

    this.dataStorageService.storeRecipes();
  }

  onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required, 
          Validators.pattern( /^[1-9]+[0-9]*$/ ) //** NO SPACES IN BETWEEN THE SLASHES OR IT BREAKS **
        ])
      })
    );
  }

  onDeleteIngredient( index: number ): void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onClearAllIngredients(): void {
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  onCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm(): void {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push( 
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required, 
                Validators.pattern( /^[1-9]+[0-9]*$/ ) //** NO SPACES IN BETWEEN THE SLASHES OR IT BREAKS **
              ])
            })
          )
        }
      }

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
