import {WalletConnectService} from "../service/wallet-connect.service";
import {Subscription} from "rxjs";
import {WalletConnectMessage} from "../model/Models";
import {WINDOW_MESSAGES} from "@provenanceio/walletconnect-js/lib/service";
import {Router} from "@angular/router";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {WalletInfo, WCSState} from "@provenanceio/walletconnect-js/lib/types";
import '../extensions';

@Component({
    template: ''
})
export class AbstractWalletConnectedComponent<T = any> implements OnInit, OnDestroy {
    private wcS: Subscription;

    constructor(public walletConnectService: WalletConnectService,
                router: Router) {
        this.wcS = this.walletConnectService.wcMessages.subscribe(
            (m: WalletConnectMessage) => {
                switch (m.windowMessage) {
                    case WINDOW_MESSAGES.DISCONNECT:
                        router.navigate(['/connect-wallet']);
                        break;
                    case WINDOW_MESSAGES.CONNECTED:
                        router.navigate(['/home']);
                        break;
                }
            }
        );

    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.wcS.unsubscribe();
    }

    disconnect(): void {
        this.walletConnectService.disconnect();
    }

    walletConnected(): Boolean {
        return this.walletConnectService.connected;
    }

    walletConnectState(): WCSState {
        return this.walletConnectService.state;
    }

    walletInfo(): WalletInfo {
        return this.walletConnectService.state.walletInfo;
    }

    truncatedWalletName(): String {
        return ((this.walletConnectState().walletInfo.name ?? 'N/A') as String).truncName();
    }

    truncatedAddress(): String {
        return ((this.walletConnectState().address) as String).truncAddress();
    }
}
