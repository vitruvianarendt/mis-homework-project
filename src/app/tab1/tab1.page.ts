import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Contact } from '../models/contact';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  createContactForm!: FormGroup;
  @ViewChild('createForm')
  createForm!: FormGroupDirective;

  constructor(
    private modalController: ModalController,
    private dataService: DataService
  ) { }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit(): void {
    this.createContactForm = new FormGroup({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl(''),
      'phone': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required)
    });
  }

  submitForm() {
    // Create a new Event object
    const event = new Event('submit');
    
    // Pass the event object to the onSubmit() method
    this.createForm.onSubmit(event);
  }


  createContact(values: any) {
    // copy all the form values into the new contact
    let newContact: Contact = { ...values };
    this.dataService.createContact(newContact);
    this.dismissModal();
  }
}
