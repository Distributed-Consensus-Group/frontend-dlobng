import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './routing/app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConnectWalletComponent} from './connect-wallet/connect-wallet.component';
import {HomeComponent} from './home/home.component';
import {SidebarComponent} from './common/sidebar.component';
import {HeaderComponent} from './common/header.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {WalletConnectService} from "./service/wallet-connect.service";
import {AbstractWalletConnectedComponent} from "./common/abstract-wallet-connected.component";

@NgModule({
    declarations: [
        AppComponent,
        AbstractWalletConnectedComponent,
        ConnectWalletComponent,
        HomeComponent,
        SidebarComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule
    ],
    providers: [
        WalletConnectService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
