import { Group } from "src/app/category/group/group.model";
import { Item } from "src/app/category/group/item/item.model";

export class Category {
    name: string;
    src: string;
    subCategories: Category[];
    groups: Group[];
    items: Item[];
    spread: boolean = false;

    constructor(name: string, src?: string, subCategories?: Category[], groups?: Group[], items?: Item[]) {
        this.name = name;
        this.src = src;
        this.subCategories = subCategories;
        this.groups = groups;
        this.items = items;
    }
}