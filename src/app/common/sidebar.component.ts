import {Component} from '@angular/core';
import {WalletConnectService} from "../service/wallet-connect.service";
import {AbstractWalletConnectedComponent} from "./abstract-wallet-connected.component";
import {Router} from "@angular/router";

@Component({
    selector: 'aside[app-sidebar]',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent extends AbstractWalletConnectedComponent {
    constructor(walletConnectService: WalletConnectService,
                private router: Router
    ) {
        super(walletConnectService, router);
    }

}
