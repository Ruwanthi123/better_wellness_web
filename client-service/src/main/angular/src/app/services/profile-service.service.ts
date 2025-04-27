import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {IUser} from "../user";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ProfileServiceService implements Resolve<any> {

    OnCounsellorsFetchDataChange: BehaviorSubject<any> = new BehaviorSubject({});
    OnLoginUserFetchDataChange: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private httpClient: HttpClient) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getLoginUserDetails(email: string) {
        if (email) {
            const url = 'http://localhost:8083/api/profile/getLoginUserDetails';
            const body = { email: email };

            return this.httpClient.post(url, body).toPromise()
                .then((response) => {
                    console.log('Login user details fetched successfully:', response);
                    this.OnLoginUserFetchDataChange.next(response);
                })
                .catch((error) => {
                    console.error('Error fetching login user details:', error);
                });
        } else {
            return Promise.resolve();
        }
    }


    getCounsellorsDetails(role: string) {
        if (role === 'Customer') {
            return this.httpClient.get('http://localhost:8083/api/profile/getAllCounsellors').toPromise()
                .then((response) => {
                    console.log('Counsellors fetched successfully:', response);
                    this.OnCounsellorsFetchDataChange.next(response);

                })
                .catch((error) => {
                    console.error('Error fetching counsellors:', error);
                });
        } else {
            return Promise.resolve();
        }
    }
}
