import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../user';
import {CognitoService} from "../services/cognito.service";
import {PROF_PREFIX} from "../constant/common-settings";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  isConfirm: boolean = false;
  user: IUser = {} as IUser;
  errorMessage: string = '';
  constructor(private router: Router, private cognitoService: CognitoService,private httpClient:HttpClient) {
  }

  ngOnInit(): void {
   this.httpClient.get('https://6boqrnrszc.execute-api.us-east-1.amazonaws.com/user?firstName=stack&lastName=MJ')
   .subscribe(data=>{
    console.log(data);
   })
  }

  public signUp(): void {
    this.cognitoService.signUp(this.user).then(() => {
      this.isConfirm = true;
    }).catch((error: any) => {
      alert(error);
    })

  }

  public confirmSignUp(): void {
    this.cognitoService.confirmSignup(this.user).then(() => {
      debugger
      console.log(this.user);
      let userData={
        name: this.user.name,
        email: this.user.email,
        role: this.user.role
      }
      this.httpClient.post(PROF_PREFIX+'/api/profile/createProfile', userData).subscribe({
        next: (response) => {
          console.log('User saved successfully in backend:', response);
          this.router.navigate(['/signIn']);
        },
        error: (error) => {
          console.error('Error saving user in backend:', error);
          alert('Failed to save user details. Please try again.');
        }
      });

    }).catch((error: any) => {
      alert(error);
    });
  }


}