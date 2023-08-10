import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRecipePage } from './new-recipe.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { NewRecipePageRoutingModule } from './new-recipe-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NewRecipePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewRecipePage]
})
export class NewRecipePageModule {}
