import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, map, take, tap } from 'rxjs';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

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
    private recipesService:RecipesService,
    private authService:AuthService
  ) { }

  storeRecipes():void {
    const recipes = this.recipesService.getRecipes()
    this.http
      .put( this.url, recipes )
      .subscribe(
        response => console.log(response)
      )
  }

  fetchRecipes() {

    return this.authService.user.pipe(

      take(1),

      exhaustMap( user => {
        const params = new HttpParams().set('auth', user.token)
        return this.http
          .get <Recipe[]> (
            this.url,
            {params}
          )
      }),
      
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
