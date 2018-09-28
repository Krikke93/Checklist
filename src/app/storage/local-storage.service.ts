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
    this.storeSettings(settings);
    this.storeAllItems(categories, settings.currentProfile);
  }

  public loadAll(categories: Category[], settings: Settings) {
    this.loadSettings(settings);
    this.loadAllItems(categories, settings.currentProfile);
  }

  public eraseAll(categories: Category[], profile: number) {
    const items = this.categoryService.getAllItems(categories);
    for(let item of items) {
      this.storage.remove(this.getItemStorageKey(profile, item));
    }
  }

  public storeAllItems(categories: Category[], profile: number) {
    const items = this.categoryService.getAllItems(categories);
    for(let item of items) {
      this.storage.set(this.getItemStorageKey(profile, item), item.checked);
    }
  }

  private getItemStorageKey(profile: number, item: Item): string {
    if(profile == 0) {
      return `${environment.game}_checked_${item.src}`;
    } else {
      return `${environment.game}_checked_${profile}_${item.src}`;
    }
  }

  public loadAllItems(categories: Category[], profile: number) {
    const items = this.categoryService.getAllItems(categories);
    for(let item of items) {
      const storedValue = this.storage.get(this.getItemStorageKey(profile, item));
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
    this.storage.set(this.getSettingsStorageKey('profiles'), settings.profiles);
    this.storage.set(this.getSettingsStorageKey('currentProfile'), settings.currentProfile);
  }

  public loadSettings(settings: Settings) {
    let nightMode = this.storage.get(this.getSettingsStorageKey('nightMode'));
    let organized = this.storage.get(this.getSettingsStorageKey('organized'));
    let onlyEmpty = this.storage.get(this.getSettingsStorageKey('onlyEmpty'));
    let onlyChecked = this.storage.get(this.getSettingsStorageKey('onlyChecked'));
    let clickedNewAbout = this.storage.get(this.getSettingsStorageKey('clickedNewAbout'));
    let profiles = this.storage.get(this.getSettingsStorageKey('profiles'));
    let currentProfile = this.storage.get(this.getSettingsStorageKey('currentProfile'));

    if(nightMode != null) settings.nightMode = nightMode;
    if(organized != null) settings.organized = organized;
    if(onlyEmpty != null) settings.onlyEmpty = onlyEmpty;
    if(onlyChecked != null) settings.onlyChecked = onlyChecked;
    if(clickedNewAbout != null) settings.clickedNewAbout = clickedNewAbout;
    if(profiles != null) settings.profiles = profiles;
    if(currentProfile != null) settings.currentProfile = currentProfile;
    for(let filter of settings.groupFilters) {
      let checked = this.storage.get(this.getSettingsStorageKey('filter_' + filter.src));
      if(checked != null) filter.checked = checked;
    }
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
