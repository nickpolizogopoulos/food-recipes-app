import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  template: `
  
    <div class="row">
      <div class="col-md-5">
          <app-recipe-list></app-recipe-list>
      </div>
      <div class="col-md-7">
          <router-outlet></router-outlet>
      </div>
    </div>
  
  `
})
export class RecipesComponent {}
