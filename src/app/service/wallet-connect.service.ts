import {Injectable} from '@angular/core';
import {WalletConnectService as WC, WINDOW_MESSAGES,} from '@provenanceio/walletconnect-js/lib/service';
import {from, Observable, Subject} from 'rxjs';
import {WalletConnectMessage} from '../model/Models';
import type {SendMessageMethod, WCSState,} from '@provenanceio/walletconnect-js/lib/types';

@Injectable({
    providedIn: 'root',
})
export class WalletConnectService {
    private wc: WC;
    private readonly wcSubject: Subject<WalletConnectMessage> = new Subject<WalletConnectMessage>();
    private isAwaitingWallet: boolean = false;

    constructor() {
        this.wc = new WC();

        Object.values(WINDOW_MESSAGES).forEach((v) => {
            this.wc.addListener(v, (results: any) => {
                this.wcSubject.next(new WalletConnectMessage(v, results));
            });
        });
        this.wcSubject.subscribe(this.observer);

        //does it look like local storage is still connected?
        if (this.connected) {
            const af = async () => {
                await this.wc.connect();
            };
            af();
        }
    }

    private observer(m: WalletConnectMessage): void {

        switch (m.windowMessage) {
            case WINDOW_MESSAGES.DISCONNECT:
                break;
        }
    }

    sendMessageData<T>(customMessageData: SendMessageMethod): Observable<T> {
        this.isAwaitingWallet = true;
        return <Observable<T>><unknown>from(this.wc.sendMessage(customMessageData));
    }

    connect(): Observable<WCSState> {
        if (this.connected)
            return new Observable<WCSState>((obs) => {
                obs.next(this.wc.state);
                obs.complete();
            });

        const af = async (): Promise<WCSState> => {
            await this.wc.connect();
            return this.wc.state;
        };
        return from(af());
    }

    disconnect(): Observable<WCSState> {
        if (!this.connected)
            return new Observable<WCSState>((obs) => {
                obs.next(this.wc.state);
                obs.complete();
            });

        const af = async (): Promise<WCSState> => {
            await this.wc.disconnect();
            return this.wc.state;
        };
        return from(af());
    }

    public get wcMessages(): Subject<WalletConnectMessage> {
        return this.wcSubject;
    }

    get state(): WCSState {
        return this.wc.state;
    }

    get address(): string {
        return this.state.address;
    }

    get connected(): boolean {
        return this.wc.state.status === "connected";
    }

    get awaitingWallet(): boolean {
        return this.isAwaitingWallet;
    }
}
