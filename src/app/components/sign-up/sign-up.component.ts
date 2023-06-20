import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserservicesService } from 'src/app/Services/userservices.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  msg: String = '';
  user: any = {};


  signupForm: FormGroup = new FormGroup({
    fnmae: new FormControl(''),
    email: new FormControl(''),
    pwd: new FormControl(''),
    confirm_pwd: new FormControl(''),
    country: new FormControl(''),
  });
  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserservicesService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fname: [''],
      email: [''],
      pwd: [''],
      confirm_pwd: [''],
      country: [''],

    })
}

signup() {

  console.log('Here user', this.user);
  var val = this.checkData(this.user);
  if (val == true) {
    this.userService.signUp(this.user).subscribe(
      (data) => {
        console.log('Here data from BE after add user', data.message);

        if (data.message == "0") {
          console.log('Email already Exist  !');
          this.msg = "Email used !";
        }
        else {
          console.log('aplication ', data.id);
          localStorage.setItem('connectedUser', (data.id));
          this.router.navigate([`profile/${data.id}`]);
        }
      }
    )
  }
  else {

    console.log('error');
  }


}
validatePassword(pwd: String) {
  const passw = /^[A-Za-z]\w{7,14}$/;
  return passw.test(String(pwd.toLocaleLowerCase()));
}

validateEmail(email: string) {
  const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
}


checkData(user: any) {
  var element = <HTMLInputElement>document.getElementById("checkbox");
  var isChecked = element.checked;
  var valid = true;
  var x = this.validateEmail(this.user.email);
  var y = this.validatePassword(this.user.pwd);
  if (user.fname == undefined ) {
    this.msg = "Name is Required !";
    valid = false;
  }
  else if (x == false) {
    this.msg = "Please check you Email !";
    valid = false;
  }
  else if (y == false) {
    this.msg = "Password between 7 to 16 characters : only characters, numeric digits, underscore and first character must be a letter ";
    valid = false;
  }
  else if (user.confirm_pwd != user.pwd) {
    console.log('confirm pwd', user.confirm_pwd);
    this.msg = "Please confirm your password !";
    valid = false;
  }

  else if (user.country == undefined) {
    this.msg = "Country is Required !";
    valid = false;
  }
 
  else if (isChecked == false) {
    this.msg = "Please Accept the Pivacy Policy";
    valid = false
  }


  return valid;
}





}
