import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PROF_PREFIX} from '../constant/common-settings';


@Injectable({
    providedIn: 'root'
})
export class ProfileServiceService implements Resolve<any> {

    OnCounsellorsFetchDataChange: BehaviorSubject<any> = new BehaviorSubject({});
    OnCustomersFetchDataChange: BehaviorSubject<any> = new BehaviorSubject({});
    OnLoginUserFetchDataChange: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private httpClient: HttpClient) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getLoginUserDetails(email: string) {
        if (email) {
            const url = PROF_PREFIX + '/api/profile/getLoginUserDetails';
            const body = {email: email};

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
            return this.httpClient.get(PROF_PREFIX + '/api/profile/getAllCounsellors').toPromise()
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

    getCustomerDetails(role: string) {
        if (role === 'Counsellor') {
            return this.httpClient.get(PROF_PREFIX + '/api/profile/getAllCustomers').toPromise()
                .then((response) => {
                    console.log('Customers fetched successfully:', response);
                    this.OnCustomersFetchDataChange.next(response);

                })
                .catch((error) => {
                    console.error('Error fetching Customers:', error);
                });
        } else {
            return Promise.resolve();
        }
    }
}
