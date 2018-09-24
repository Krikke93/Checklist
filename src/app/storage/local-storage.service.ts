import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Category } from '../category/category.model';
import { Item } from '../category/group/item/item.model';
import { CategoryService } from '../category/category.service';
import { environment } from '../../environments/environment';
import { Settings } from '../settings/settings.model';
import { min } from 'rxjs/operators';

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
    this.storage.set(this.getSettingsStorageKey('organized'), settings.organized);
    this.storage.set(this.getSettingsStorageKey('onlyEmpty'), settings.onlyEmpty);
    this.storage.set(this.getSettingsStorageKey('onlyChecked'), settings.onlyChecked);
    for(let filter of settings.groupFilters) {
      this.storage.set(this.getSettingsStorageKey('filter_' + filter.src), filter.checked);
    }
    this.storage.set(this.getSettingsStorageKey('clickedNewAbout'), settings.clickedNewAbout);
  }

  public loadSettings(settings: Settings) {
    let nightMode = this.storage.get(this.getSettingsStorageKey('nightMode'));
    let organized = this.storage.get(this.getSettingsStorageKey('organized'));
    let onlyEmpty = this.storage.get(this.getSettingsStorageKey('onlyEmpty'));
    let onlyChecked = this.storage.get(this.getSettingsStorageKey('onlyChecked'));

    if(nightMode != null) settings.nightMode = nightMode;
    if(organized != null) settings.organized = organized;
    if(onlyEmpty != null) settings.onlyEmpty = onlyEmpty;
    if(onlyChecked != null) settings.onlyChecked = onlyChecked;
    for(let filter of settings.groupFilters) {
      let checked = this.storage.get(this.getSettingsStorageKey('filter_' + filter.src));
      if(checked != null) filter.checked = checked;
    }

    let clickedNewAbout = this.storage.get(this.getSettingsStorageKey('clickedNewAbout'));
    if(clickedNewAbout != null) settings.clickedNewAbout = clickedNewAbout;
  }

  public getMinimized(src: string): boolean {
    let minimized = this.storage.get(this.getSettingsStorageKey(src + '_minimized'));
    if(minimized != null) {
      return minimized;
    } else {
      return false;
    }
  }

  public storeMinimized(src: string, minimized: boolean) {
    this.storage.set(this.getSettingsStorageKey(src + '_minimized'), minimized);
  }

  private getSettingsStorageKey(property: string): string {
    return `${environment.game}_settings_${property}`;
  }
}
