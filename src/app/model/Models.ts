import {SendMessageMethodResult} from "@provenanceio/walletconnect-js/lib/types";

export class WalletConnectMessage {
    constructor(
        public windowMessage: string,
        public results: SendMessageMethodResult
    ) {
    }
}
