import {Component, OnDestroy, OnInit} from '@angular/core';
import {CognitoService} from '../services/cognito.service';
import {IUser} from '../user';
import {ProfileServiceService} from "../services/profile-service.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {

    user: IUser = {} as IUser;
    userDetails: any;
    OnCounsellorsChangeSub = new Subscription();
    OnLoginUserChangeSub = new Subscription();
    counsellors: ICounsellor[] | undefined
    customers: ICounsellor[] | undefined

    constructor(private cognitoService: CognitoService, private profileServiceService: ProfileServiceService, private router: Router) {
    }

    public ngOnInit(): void {
        this.cognitoService.getUser().then((user) => {
            this.user = user.attributes;
            this.user.role = user.attributes['custom:role'];
            this.profileServiceService.getLoginUserDetails(this.user.email)
            this.profileServiceService.getCounsellorsDetails(this.user.role);
            this.profileServiceService.getCustomerDetails(this.user.role);

        });


        this.OnCounsellorsChangeSub = this.profileServiceService.OnCounsellorsFetchDataChange.subscribe(
            (response) => {
                if (!response.isEmpty) {
                    this.counsellors = response
                }
            }
        );

        this.OnCounsellorsChangeSub = this.profileServiceService.OnCustomersFetchDataChange.subscribe(
            (response) => {
                if (!response.isEmpty) {
                    this.customers = response
                }
            }
        );


        // @ts-ignore
        this.OnLoginUserChangeSub = this.profileServiceService.OnLoginUserFetchDataChange.subscribe(
            (response: any) => {
                if (response) {
                    this.userDetails = response;
                    console.log(this.userDetails);
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.OnCounsellorsChangeSub.unsubscribe();
        this.OnLoginUserChangeSub.unsubscribe();
    }

    openChat(selectedUser: any): void {
        console.log('Starting chat with user:', selectedUser);
        this.router.navigate(['/messageView'], {
            queryParams: {
                selectedUserID: selectedUser.id,
                loginUserID: this.userDetails.id,
                selectedUserName: selectedUser.name,
            }
        });
    }

}

export interface ICounsellor {
    name: string;
    email: string;
    role: string;
}
