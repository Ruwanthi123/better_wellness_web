import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { MSG_PREFIX } from '../constant/common-settings';
import {ConfigService} from "./config.service";

@Injectable({
    providedIn: 'root'
})
export class MessageServiceService implements Resolve<any> {

    OnMessagesChange: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private httpClient: HttpClient,
                private configService: ConfigService) {
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

    getAllMessages(sender: number | undefined, receiver: number | undefined) {
        if (sender != null && receiver != null) {
            const url =  this.configService.messageApiUrl + '/api/message/getMessagesBySenderAndReceiver';
            const body = {
                sender: sender,
                receiver: receiver
            };

            return this.httpClient.post(url, body).toPromise()
                .then((response) => {
                    console.log('Messages fetched successfully:', response);
                    this.OnMessagesChange.next(response);
                })
                .catch((error) => {
                    console.error('Error fetching Messages:', error);
                });
        } else {
            return Promise.resolve();
        }
    }

    sendMessage(messagePayload: any) {
        return this.httpClient.post<any>( this.configService.messageApiUrl +'/api/message/saveMessage', messagePayload);
    }


}
