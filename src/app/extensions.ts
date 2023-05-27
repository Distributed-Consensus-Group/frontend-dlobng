declare global {
    interface String {
        truncAddress(): String;

        truncName(): String
    }
}

String.prototype.truncAddress = function (): String {
    let l = this.length;
    return `${this.substring(0, 3)}...${this.substring(l - 8, l)}`;
}

String.prototype.truncName = function (): String {
    let l = this.length;
    return this.length > 16 ? `${this.substring(0, 10)}...${this.substring(l - 3, l)}` : this;
}

export {};
