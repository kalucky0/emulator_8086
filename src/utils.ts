export const $ = (selector: any) => <HTMLElement>document.querySelector(selector);
export const $$ = (selector: any) => <NodeListOf<HTMLElement>>document.querySelectorAll(selector);
export const getRandomInt = (min: number, max: number): Number => {
    min = Math.ceil(min);
    return Math.floor(Math.random() * (Math.floor(max) - min)) + min;
};
export const toHex = (value: number): string => {
    return value.toString(16).toUpperCase();
}

declare global {
    interface Number {
        toHex() : string;
    }
}

Number.prototype.toHex = function (this: number): string {
    return this.toString(16);
};