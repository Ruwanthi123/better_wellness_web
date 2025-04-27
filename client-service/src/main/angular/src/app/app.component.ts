import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CognitoService} from "./services/cognito.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private router: Router, private cognitoService: CognitoService) {
  }

  public ngOnInit(): void {
    this.cognitoService.authNotifier.subscribe((status: boolean) => {
      this.isAuthenticated = status;
    })
    this.cognitoService.getRole().then((role: any) => {
      if (role) {
        this.isAuthenticated = true;
      }
      else {
        this.isAuthenticated = false;
      }
    })
  }

  public signOut(): void {
    this.cognitoService.signOut().then(() => {
      this.cognitoService.notifyAuthStatus(false);
      this.router.navigate(['/signIn']);
    }).catch((error) => {
      alert(error);
    })
  }

}