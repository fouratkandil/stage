import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserservicesService } from 'src/app/Services/userservices.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit{
  user: any = {};
  ok_password: any;
  connectedUser: any = {};
  id:any;

  msgError: string = "";
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    pwd: new FormControl('')
  });
  constructor(private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserservicesService

  ) { }
  
  
  ngOnInit(): void {
    

    this.loginForm = this.formBuilder.group({
      email: [''],
      pwd: ['']
    });

  }



  Login() {
    console.log('Here my user ', this.user);
    this.userService.logIn(this.user).subscribe(
      (data: { message: string; name: string; }) => {
        console.log('Data after login', data);

        if (data.message == '0') {
          this.ok_password = false;
          this.msgError = 'Please Check your email';
        } else if (data.message == '1') {
          this.msgError = 'Please Check your PWD';
        } else {

          console.log('Name: ', data);
          this.id = data.name;
          localStorage.setItem('connectedUser', (data.name));
          const token = localStorage.getItem("token");
          if (token == null) {
            this.router.navigate([`profile/${data.name}`]);
          }
          else {

            this.router.navigate(['']);
          }
          this.router.navigate(['']);

        }

      }
    );
  }


  forgotPassword() {
    // Add your logic here to handle the password reset functionality
    console.log('Forgot password clicked');
  }
}
