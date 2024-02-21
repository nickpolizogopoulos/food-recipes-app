import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  databaseUrl:string = 'https://ng-course-food-application-default-rtdb.firebaseio.com';
  databaseFolder:string = '/recipes';
  json:string = '.json';
  url:string = this.databaseUrl + this.databaseFolder + this.json;

  constructor(
    private http:HttpClient,
    private recipesService:RecipesService
  ) { }

  storeRecipes():void {
    const recipes = this.recipesService.getRecipes()
    this.http
      .put( this.url, recipes )
      .subscribe(
        response => console.log(response)
      )
  }

  fetchRecipes():Observable<Recipe[]> {
    return this.http
      .get <Recipe[]> ( this.url )
      .pipe(

        map( recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          })
        }),

        tap( recipes => 
          this.recipesService.setRecipes(recipes)
        )
      )
      
  }


}
