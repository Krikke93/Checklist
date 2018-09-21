import { Item } from "../category/group/item/item.model";

export class Settings {
    nightMode: boolean = false;
    onlyEmpty: boolean = false;
    onlyChecked: boolean = false;
    groupFilters: Item[] = [];

    constructor(groupFilters: Item[]) {
        this.groupFilters = groupFilters;
    }

    toggleOnlyEmpty() {
        this.onlyEmpty = !this.onlyEmpty;
        if (this.onlyEmpty) {
            this.onlyChecked = false;
        }
    }

    toggleOnlyChecked() {
        this.onlyChecked = !this.onlyChecked;
        if (this.onlyChecked) {
            this.onlyEmpty = false;
        }
    }

    hasGroupFilterActive(src: string) {
        for(let filter of this.groupFilters) {
            if(filter.src === src) return filter.checked;
        }
        return false;
    }

}