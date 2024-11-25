import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-start',
  template: `
  
    <!-- <ol class="lead">
      <li>
          <p>Select <u>Manage</u> at the top right and then Fetch Data.</p>
      </li>
      <li>
          <p>Once the recipe list is fetched, select a recipe to read, edit or delete from the recipe list.</p>
      </li>
      <li>
          <p>When you finish, select <u>Manage</u> and then <u>Save</u> to save the changes!</p>
      </li>
    </ol> -->
    <ul style="list-style-type: circle;" class="lead">
      <li>
          <p>Select a recipe to see its ingredients</p>
      </li>
      <li>
          <p>Select "Manage Recipe" to add the list of ingredients to the shopping list, edit the recipe or delete it.</p>
      </li>
      <li>
          <p>If you choose to edit, hit save, to update the recipe!</p>
      </li>
    </ul>
  
  `
})
export class RecipeStartComponent {}