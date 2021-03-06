import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { userLog } from '../models/user.model';
import * as userActions from '../actions/user.actions';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';
import { NativeHelpersService } from '../services/native-helpers.service';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.page.html',
  styleUrls: ['./loggin.page.scss'],
})
export class LogginPage implements OnInit {

  step: number = 0;
  step2: number = 0;
  register: boolean = false;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<StoreModel>,
    private native: NativeHelpersService
  ) { }

  ngOnInit() {

    this.userForm = this.fb.group({
      name: null,
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  get name(){
    return this.userForm.get('name');
  }

  get email(){
    return this.userForm.get('email');
  }

  get pswd(){
    return this.userForm.get('password');
  }

  loginEnter(){
    if(this.pswd.valid) this.signin(this.userForm.value);
  }

  async signin(user: userLog){
    this.store.dispatch(userActions.Signin({user}));
  }

  async signup(user: userLog){
    if(user.password === user.confirmPassword){
      this.native.showLoading();
      this.store.dispatch(userActions.Signup({user}));
      this.register = false;
    } else {
      await this.native.showError('Error, las contraseñas no coinciden');
    }
  }

}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}