import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MessageServiceService} from "../services/message-service.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-message-view',
    templateUrl: './message-view.component.html',
    styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent implements OnInit, OnDestroy {

    customerID: number | undefined;
    counsellorID: number | undefined;
    loginUserID: number | undefined;
    receiverName: String | undefined;
    messages: any[] | undefined ;

    newMessage: string = '';

    OnMessageChangeSub = new Subscription();

    constructor(private route: ActivatedRoute,private messageServiceService: MessageServiceService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.customerID = params['customerID'];
            this.counsellorID = params['counsellorID'];
            this.loginUserID = params['loginUser'];
            this.receiverName = params['receiverName'];

            console.log('Customer ID:', this.customerID);
            console.log('Counsellor ID:', this.counsellorID);
            console.log('loginUserID:', this.loginUserID);
            console.log('receiverName:', this.receiverName);

            this.messageServiceService.getAllMessages(this.customerID, this.counsellorID);
        });

        this.OnMessageChangeSub =this.messageServiceService.OnMessagesChange.subscribe(
            (response) => {
                if(!response.isEmpty){
                    this.messages=response
                }
            }
        );
    }

    sendMessage() {
        if (this.newMessage.trim() !== '') {
            // @ts-ignore
            this.messages.push({
                sender: this.loginUserID,
                content: this.newMessage,
                time: new Date()
            });
            this.newMessage = '';

            setTimeout(() => {
                this.scrollToBottom();
            }, 100); // wait a little for DOM update
        }
    }

    scrollToBottom() {
        const chatMessagesDiv = document.querySelector('.chat-messages');
        if (chatMessagesDiv) {
            chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
        }
    }

    ngOnDestroy(): void {
        this.OnMessageChangeSub.unsubscribe();
    }

}
