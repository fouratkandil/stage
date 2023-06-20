import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { LogInComponent } from 'src/app/components/log-in/log-in.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'SignUp', component: SignUpComponent },
  {path: 'LogIn', component: LogInComponent },
  {path: 'Reset', component: ResetpasswordComponent },

  {
    path: '**',
    redirectTo: '',
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
