import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {WalletConnectService} from "../service/wallet-connect.service";
import {AbstractWalletConnectedComponent} from "./abstract-wallet-connected.component";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'header[app-header]',
    templateUrl: './header.component.html'
})
export class HeaderComponent extends AbstractWalletConnectedComponent implements OnInit {

    private sideBarExpanded: boolean = true;

    constructor(@Inject(DOCUMENT) private document: Document,
                walletConnectService: WalletConnectService,
                private router: Router,
                private renderer: Renderer2
    ) {
        super(walletConnectService, router);
    }

    handleExpand(): void {
        if (this.sideBarExpanded) {
            this.renderer.addClass(this.document.body, 'page-sidebar-mini');
        } else {
            this.renderer.removeClass(this.document.body, 'page-sidebar-mini');

        }
        this.sideBarExpanded = !this.sideBarExpanded;
    }
}
