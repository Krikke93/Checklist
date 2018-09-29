import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Category } from '../category/category.model';
import { Item } from '../category/group/item/item.model';
import { CategoryService } from '../category/category.service';
import { environment } from '../../environments/environment';
import { Settings } from '../settings/settings.model';
import { min } from 'rxjs/operators';
import { VersionService } from '../about/version.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService,
    private categoryService: CategoryService,
    private versionService: VersionService
  ) { }

  public storeAll(categories: Category[], settings: Settings) {
    this.storeSettings(settings);
    this.storeAllItems(categories, settings.currentProfile);
  }

  public loadAll(categories: Category[], settings: Settings, isProfileChange: boolean = false) {
    this.loadSettings(settings, isProfileChange);
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
    this.storage.set(this.getSettingsStorageKey('currentProfile'), settings.currentProfile);
    this.storage.set(this.getSettingsStorageKey('profiles'), settings.profiles);

    this.storage.set(this.getSettingsStorageKey('nightMode', settings.currentProfile), settings.nightMode);
    this.storage.set(this.getSettingsStorageKey('organized', settings.currentProfile), settings.organized);
    this.storage.set(this.getSettingsStorageKey('onlyEmpty', settings.currentProfile), settings.onlyEmpty);
    this.storage.set(this.getSettingsStorageKey('onlyChecked', settings.currentProfile), settings.onlyChecked);
    this.storage.set(this.getSettingsStorageKey('activeUniqueFilter', settings.currentProfile), settings.activeUniqueFilter);
    for(let filter of settings.groupFilters) {
      this.storage.set(this.getSettingsStorageKey('filter_' + filter.src, settings.currentProfile), filter.checked);
    }
    for(let filter of settings.specialFilters) {
      this.storage.set(this.getSettingsStorageKey('specialfilter_' + filter.src, settings.currentProfile), filter.checked);
    }

    this.versionService.getLogsJSON().subscribe((verions) => {
      let latest = verions[0].version;

      this.storage.set(this.getSettingsStorageKey('clickedNewAbout_' + latest), settings.clickedNewAbout);
    });
  }

  public loadSettings(settings: Settings, isProfileChange: boolean = false) {
    let currentProfile = this.storage.get(this.getSettingsStorageKey('currentProfile'));
    let profiles = this.storage.get(this.getSettingsStorageKey('profiles'));
    if(currentProfile != null && !isProfileChange) settings.currentProfile = currentProfile;
    if(profiles != null) settings.profiles = profiles;

    let nightMode = this.storage.get(this.getSettingsStorageKey('nightMode', settings.currentProfile));
    let organized = this.storage.get(this.getSettingsStorageKey('organized', settings.currentProfile));
    let onlyEmpty = this.storage.get(this.getSettingsStorageKey('onlyEmpty', settings.currentProfile));
    let onlyChecked = this.storage.get(this.getSettingsStorageKey('onlyChecked', settings.currentProfile));
    let activeUniqueFilter = this.storage.get(this.getSettingsStorageKey('activeUniqueFilter', settings.currentProfile));

    if(nightMode != null) settings.nightMode = nightMode;
    if(organized != null) settings.organized = organized;
    if(onlyEmpty != null) settings.onlyEmpty = onlyEmpty;
    if(onlyChecked != null) settings.onlyChecked = onlyChecked;
    if(activeUniqueFilter != null) settings.activeUniqueFilter = activeUniqueFilter;
    for(let filter of settings.groupFilters) {
      let checked = this.storage.get(this.getSettingsStorageKey('filter_' + filter.src, settings.currentProfile));
      if(checked != null) filter.checked = checked;
    }
    for(let filter of settings.specialFilters) {
      let checked = this.storage.get(this.getSettingsStorageKey('specialfilter_' + filter.src, settings.currentProfile));
      if(checked != null) filter.checked = checked;
    }

    this.versionService.getLogsJSON().subscribe((verions) => {
      let latest = verions[0].version;

      let clickedNewAbout = this.storage.get(this.getSettingsStorageKey('clickedNewAbout_' + latest));
      if(clickedNewAbout != null) settings.clickedNewAbout = clickedNewAbout;
    });
  }

  public getMinimized(src: string): boolean {
    let minimized = this.storage.get(this.getSettingsStorageKey(src + '_minimized', 0));
    if(minimized != null) {
      return minimized;
    } else {
      return false;
    }
  }

  public storeMinimized(src: string, minimized: boolean) {
    this.storage.set(this.getSettingsStorageKey(src + '_minimized', 0), minimized);
  }

  private getSettingsStorageKey(property: string, profile: number = 0): string {
    if(profile == 0) {
      return `${environment.game}_settings_${property}`;
    } else {
      return `${environment.game}_settings_${property}_${profile}`;
    }
  }
}
