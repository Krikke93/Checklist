import { Component } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { environment } from '../environments/environment';
import { CategoryService } from 'src/app/category/category.service';
import { OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import { Settings } from './settings/settings.model';
import { LocalStorageService } from './storage/local-storage.service';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  game = environment.game;
  oldCategories: Category[];
  categories: Category[];
  settings: Settings;
  erasePrompt: boolean = false;
  page: number = 0;

  constructor(
    private categoryService: CategoryService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    const filters = combineLatest(
      this.categoryService.getGroupFiltersJSON(),
      this.categoryService.getSpecialFiltersJSON(),
      this.categoryService.getUniqueFiltersJSON()
    );

    filters.subscribe(([groupFilters, specialFilters, uniqueFilters]) => {
      this.settings = new Settings(groupFilters, specialFilters, uniqueFilters);
      this.categoryService.getCategoriesJSON().subscribe((categories) => {
        this.categories = categories;
        this.storageService.loadAll(this.categories, this.settings);
        this.oldCategories = this.categories;
        this.toggleOrganized();
      });
    });
  }

  ngOnDestroy(): void {
    this.store();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.store();
  }

  reset() {
    this.erasePrompt = false;
    this.store();
    this.storageService.eraseAll(this.categories, this.settings.currentProfile);
    this.ngOnInit();
  }

  store() {
    this.storageService.storeAll(this.categories, this.settings);
  }

  profileChanged(profile) {
    this.storageService.loadAll(this.categories, this.settings, true);
  }

  profileAboutToChange(profile) {
    this.storageService.storeAll(this.categories, this.settings);
  }

  toggleOrganized() {
    if(this.settings.organized) {
      this.categories = this.oldCategories;
    } else {
      this.oldCategories = this.categories;
      this.categories = [this.categoryService.getCompactCategory(this.categories, this.settings.groupFilters)];
    }
  }

  setPage(page: number) {
    if(page == this.page) {
      this.page = 0;
    } else {
      this.page = page;
    }
  }

}
