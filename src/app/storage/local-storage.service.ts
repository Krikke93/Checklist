import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Category } from '../category/category.model';
import { Item } from '../category/group/item/item.model';
import { CategoryService } from '../category/category.service';
import { environment } from '../../environments/environment';
import { Settings } from '../settings/settings.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private categoryService: CategoryService
  ) { }

  public storeAll(categories: Category[], settings: Settings) {
    this.storeAllItems(categories);
    this.storeSettings(settings);
  }

  public loadAll(categories: Category[], settings: Settings) {
    this.loadAllItems(categories);
    this.loadSettings(settings);
  }

  public eraseAll(categories: Category[]) {
    const items = this.categoryService.getAllItems(categories);
    for(let item of items) {
      this.storage.remove(this.getItemStorageKey(item));
    }
    this.storeSettings(new Settings());
  }

  public storeAllItems(categories: Category[]) {
    const items = this.categoryService.getAllItems(categories);
    for(let item of items) {
      this.storage.set(this.getItemStorageKey(item), item.checked);
    }
  }

  private getItemStorageKey(item: Item): string {
    return `${environment.game}_checked_${item.src}`;
  }

  public loadAllItems(categories: Category[]) {
    const items = this.categoryService.getAllItems(categories);
    for(let item of items) {
      const storedValue = this.storage.get(this.getItemStorageKey(item));
      item.checked = storedValue;
    }
  }

  public storeSettings(settings: Settings) {
    this.storage.set(this.getSettingsStorageKey('nightMode'), settings.nightMode);
    this.storage.set(this.getSettingsStorageKey('onlyEmpty'), settings.onlyEmpty);
    this.storage.set(this.getSettingsStorageKey('onlyChecked'), settings.onlyChecked);
  }

  public loadSettings(settings: Settings) {
    settings.nightMode = this.storage.get(this.getSettingsStorageKey('nightMode'));
    settings.onlyEmpty = this.storage.get(this.getSettingsStorageKey('onlyEmpty'));
    settings.onlyChecked = this.storage.get(this.getSettingsStorageKey('onlyChecked'));
  }

  private getSettingsStorageKey(property: string): string {
    return `${environment.game}_settings_${property}`;
  }
}
