import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: 'new-recipe.page.html',
  styleUrls: ['new-recipe.page.scss']
})
export class NewRecipePage implements OnInit {
  
  createRecipeForm!: FormGroup;
  @ViewChild('createForm')
  createForm!: FormGroupDirective;

  constructor(
    private modalController: ModalController,
    private recipeService: RecipeService
  ) { }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit(): void {
    this.createRecipeForm = new FormGroup({
      'ingredients': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'image': new FormControl(''),
      'location': new FormControl('')
    });
  }

  submitForm() {
    // Create a new Event object
    const event = new Event('submit');
    
    // Pass the event object to the onSubmit() method
    this.createForm.onSubmit(event);
  }


  createRecipe(values: any) {
    // copy all the form values into the new contact
    let newRecipe: Recipe = { ...values };
    this.recipeService.createRecipe(newRecipe);
    this.dismissModal();
  }
}
