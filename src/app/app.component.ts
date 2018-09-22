import { Component } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { environment } from '../environments/environment';
import { CategoryService } from 'src/app/category/category.service';
import { OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import { Settings } from './settings/settings.model';
import { LocalStorageService } from './storage/local-storage.service';

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

  constructor(
    private categoryService: CategoryService,
    private storageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.categoryService.getGroupFiltersJSON().subscribe((groupFilters) => {
      this.settings = new Settings(groupFilters);
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
    this.storageService.eraseAll(this.categories);
    this.ngOnInit();
  }

  store() {
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

  test() {
    console.log("test");
  }

}
