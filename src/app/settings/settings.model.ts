export class Settings {
    nightMode: boolean = false;
    onlyEmpty: boolean = false;
    onlyChecked: boolean = false;

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
}