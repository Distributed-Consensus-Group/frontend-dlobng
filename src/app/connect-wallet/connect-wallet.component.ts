import {Component} from '@angular/core';
import {WalletConnectService} from "../service/wallet-connect.service";
import {Wallet, WalletList, WCSState} from "@provenanceio/walletconnect-js/lib/types";
import {WALLET_LIST} from "@provenanceio/walletconnect-js";

@Component({
    selector: 'app-wallet-connect',
    templateUrl: './connect-wallet.component.html',
    styleUrls: ['./connect-wallet.component.css']
})
export class ConnectWalletComponent {

    constructor(private walletConnectService: WalletConnectService) {
    }

    state(): WCSState {
        return this.walletConnectService.state;
    }

    desktopWallets(): WalletList {
        return WALLET_LIST.filter((w) => {
            return w.type !== 'mobile'
        });
    }

    dispatchWallet(wallet: Wallet) {
        if (wallet.eventAction) {
            // Set the name of the wallet into the walletconnect-js state (to use as a reference)
            wallet.eventAction({
                uri: encodeURIComponent("test"),
                event: 'walletconnect_init',
            });
        }
    }

}
