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
    selectedUserID: number | undefined;
    counsellorID: number | undefined;
    loginUserID: number | undefined;
    selectedUserName: String | undefined;
    messages: any[] | undefined ;

    newMessage: string = '';

    OnMessageChangeSub = new Subscription();

    constructor(private route: ActivatedRoute,private messageServiceService: MessageServiceService) {
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {

            this.loginUserID = params['loginUserID'];
            this.selectedUserName = params['selectedUserName'];
            this.selectedUserID = params['selectedUserID'];

            console.log('Customer ID:', this.customerID);
            console.log('Counsellor ID:', this.counsellorID);
            console.log('loginUserID:', this.loginUserID);
            console.log('selectedUserName:', this.selectedUserName);

            this.messageServiceService.getAllMessages(this.loginUserID, this.selectedUserID);
        });

        this.OnMessageChangeSub =this.messageServiceService.OnMessagesChange.subscribe(
            (response) => {
                if(!response.isEmpty){
                    this.messages=response;
                    // @ts-ignore
                    for(let message of this.messages){
                        const formattedTimestamp = message.timestamp.replace('T', ' ');
                        message.time=formattedTimestamp;
                    }

                }
            }
        );
    }

    sendMessage() {
        if (this.newMessage.trim() !== '') {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            const messagePayload = {
                sender: this.loginUserID,
                receiver: this.selectedUserID,
                content: this.newMessage,
                timestamp: null
            };

            this.messageServiceService.sendMessage(messagePayload).subscribe({
                next: (savedMessage) => {
                    // @ts-ignore
                    this.messages.push(savedMessage);
                    this.newMessage = '';

                    setTimeout(() => {
                        this.scrollToBottom();
                    }, 100);
                },
                error: (error) => {
                    console.error('Failed to send message', error);
                }
            });
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
