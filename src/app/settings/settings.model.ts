import { Item } from "../category/group/item/item.model";

export class Settings {
    nightMode: boolean = true;
    organized: boolean = true;
    onlyEmpty: boolean = false;
    onlyChecked: boolean = false;
    groupFilters: Item[] = [];
    specialFilters: Item[] = [];
    uniqueFilters: Item[] = [];
    clickedNewAbout: boolean = false;
    profiles: string[] = ['Main Profile'];
    currentProfile: number = 0;
    activeUniqueFilter: string = 'none';

    constructor(groupFilters: Item[], specialFilters: Item[], uniqueFilters: Item[]) {
        this.groupFilters = groupFilters;
        this.specialFilters = specialFilters;
        this.uniqueFilters = uniqueFilters;
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

    setProfile(index: number, name: string) {
        if(index >= 0 && index < 10) {
            this.profiles[index] = name;
        }
    }

    getProfile(index: number): string {
        return this.profiles[index];
    }

    getCurrentProfile(): string {
        return this.getProfile(this.currentProfile);
    }

    getActiveUniqueFilter(): Item {
        const result = this.uniqueFilters.filter((filter) => filter.src === this.activeUniqueFilter);
        if(result.length > 0) return result[0];
        return null;
    }

}