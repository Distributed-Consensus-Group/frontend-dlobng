import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {filter, Observable} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";
import {WalletConnectService} from "./service/wallet-connect.service";

const enterTransition = transition(':enter', [
    style({
        opacity: 0
    }),
    animate('1s ease-in', style({
        opacity: 1
    }))
]);

const leaveTrans = transition(':leave', [
    style({
        opacity: 1
    }),
    animate('1s ease-out', style({
        opacity: 0
    }))
])

const fadeIn = trigger('fadeIn', [
    enterTransition
]);

const fadeOut = trigger('fadeOut', [
    leaveTrans
]);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        fadeIn,
        fadeOut
    ]
})
export class AppComponent implements OnInit {
    title = 'dlob-ng';

    private isLoading: Boolean = true;
    navStart: Observable<NavigationStart>;
    navEnd: Observable<NavigationEnd>;

    constructor(router: Router,
                private walletConnectService: WalletConnectService) {
        this.navStart = router.events.pipe(
            filter(evt => evt instanceof NavigationStart)
        ) as Observable<NavigationStart>;
        this.navEnd = router.events.pipe(
            filter(evt => evt instanceof NavigationEnd)
        ) as Observable<NavigationEnd>;

        this.walletConnectService.connect();
        if (this.walletConnectService.connected) {
            router.navigate(['home']).then(value =>
                console.dir(value)
            );
        } else {
            router.navigate(['connect-wallet']).then(r =>
                console.dir(r)
            );
        }

    }

    ngOnInit() {
        this.navStart.subscribe(() => {
            console.log('Navigation Started!')
            this.isLoading = true;
        });
        this.navEnd.subscribe(() => {
            console.log('Navigation Ended!')
            this.isLoading = false;

            /*
            let timerId = setInterval(() => {}, 1000);
            setTimeout(() => {
                clearInterval(timerId);
                this.isLoading = false;
            }, 1000);

             */
        });
    }

    loading() {
        return this.isLoading;
    }
}
