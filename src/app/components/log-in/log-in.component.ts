import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  email!: string;
  password!: string;
  login() {
    // Add your logic here to handle the login form submission
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // You can make API calls or perform any other actions as needed
  }

  signUp() {
    // Add your logic here to handle the sign-up functionality
    console.log('Sign up clicked');
    // Redirect to the sign-up page or perform any other actions as needed
  }

  forgotPassword() {
    // Add your logic here to handle the password reset functionality
    console.log('Forgot password clicked');
  }
}
