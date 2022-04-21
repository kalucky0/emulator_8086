export const $ = (selector: any) => <HTMLElement>document.querySelector(selector);
export const $$ = (selector: any) => <NodeListOf<HTMLElement>>document.querySelectorAll(selector);
export const getRandomInt = (min: number, max: number): Number => {
    min = Math.ceil(min);
    return Math.floor(Math.random() * (Math.floor(max) - min)) + min;
}
