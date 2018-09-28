import { Settings } from "../../../settings/settings.model";

export class Item {
    name: string;
    src: string;
    checked: boolean = false;
    isFilter = false;
    specialFilters: string[] = [];

    constructor(name: string, src: string) {
        this.name = name;
        this.src = src;
    }
}