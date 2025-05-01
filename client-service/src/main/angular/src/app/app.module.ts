import {APP_INITIALIZER, NgModule} from '@angular/core'; // ⬅ import APP_INITIALIZER
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ProfileComponent} from './profile/profile.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AuthorizeDirective} from './services/authorize.directive';
import {HttpClientModule} from '@angular/common/http';
import {MessageViewComponent} from './message-view/message-view.component';
import {ConfigService} from './services/config.service';

export function initConfig(configService: ConfigService) {
    return () => configService.loadConfig();
}

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        SignInComponent,
        SignUpComponent,
        MessageViewComponent,
        AuthorizeDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        AuthorizeDirective,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initConfig,
            deps: [ConfigService],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
