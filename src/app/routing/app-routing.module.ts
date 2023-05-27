import {inject, Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {ConnectWalletComponent} from "../connect-wallet/connect-wallet.component";
import {WalletConnectService} from "../service/wallet-connect.service";
import {HomeComponent} from "../home/home.component";

@Injectable({
    providedIn: 'root',
})
class WalletConnectedActivate {

    constructor(private walletConnectService: WalletConnectService) {
    }

    canActivate(): boolean {
        return this.walletConnectService.connected;
    }
}

const disconnectedWallet: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return !inject(WalletConnectedActivate).canActivate();
    };
const connectedWallet: CanActivateFn =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(WalletConnectedActivate).canActivate();
    };

const routes: Routes = [
    {
        path: 'connect-wallet',
        component: ConnectWalletComponent,
        canActivate: [disconnectedWallet]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [connectedWallet]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
