import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../services/cognito.service';
import { IUser } from '../user';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {

  user: IUser = {} as IUser;

  constructor(private router: Router, private cognitoService: CognitoService) {
  }

  public signIn(): void {
    this.cognitoService.signIn(this.user).then(() => {
      this.cognitoService.notifyAuthStatus(true);
      this.router.navigate(['/profile']);
    }).catch((error) => {
      alert(error);
    })

  }

}