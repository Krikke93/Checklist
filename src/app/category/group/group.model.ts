import { Item } from "src/app/category/group/item/item.model";

export class Group {
    name: string;
    src: string;
    items: Item[];

    constructor(name: string, src?: string, items?: Item[]) {
        this.name = name;
        this.src = src;
        this.items = items;
    }
}