export class Item {
    name: string;
    src: string;
    checked: boolean = false;

    constructor(name: string, src: string) {
        this.name = name;
        this.src = src;
    }
}