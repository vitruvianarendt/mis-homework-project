import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, collectionData, collection, doc, setDoc, deleteDoc, docSnapshots } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private firestore: Firestore) {}

  getRecipes(): Observable<Recipe[]> {
    const recipesCollection = collection(this.firestore, 'recipes');
    // this method returns a stream of documents mapped to their payload and id
    return collectionData(recipesCollection, {idField: 'id'})
    .pipe(
      map(recipes => recipes as Recipe[])
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    const document = doc(this.firestore, `recipes/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Recipe;
      })
    );
  }

  createRecipe(recipe: Recipe): Promise<void> {
    const document = doc(collection(this.firestore, 'recipes'));
    return setDoc(document, recipe);
  }

  updateRecipe(recipe: Recipe): Promise<void> {
    const document = doc(this.firestore, 'recipes', recipe?.id);
    const { id, ...data } = recipe; // we don't want to save the id inside the document
    return setDoc(document, data);
  }

  deleteRecipe(id: string): Promise<void> {
    const document = doc(this.firestore, 'recipes', id);
    return deleteDoc(document);
  }
}