import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {   matchOtherValidator } from '../validators/customValidator.directive';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  profileForm : FormGroup;

  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    
    this.profileForm = this.fb.group ({
    firstName : ['', Validators.required],
    lastName : ['',  Validators.required],
    email : ['',  [Validators.required, Validators.pattern( /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    phone : ['', [Validators.required, Validators.pattern(/^0\d{9}$/)]],
    password : ['',[Validators.required, Validators.minLength(8)]],
    passwordConfirm : ['', [Validators.required, Validators.minLength(8), 
      matchOtherValidator("password")]],
    address : this.fb.group({
      street: [''],
      city: [''],
      zip: ['']
    }),
  });
  }

  onSubmit(){
    console.warn(this.profileForm.value);
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  get aliases(){
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

}
