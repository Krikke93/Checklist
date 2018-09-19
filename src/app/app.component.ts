import { Component } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { Item } from 'src/app/category/group/item/item.model';
import { environment } from '../environments/environment';
import { CategoryService } from 'src/app/category/category.service';
import { Observable, of } from 'rxjs';
import { LOCAL_STORAGE, WebStorageService, StorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  game = environment.game;
  categories: Category[];

  STORE_KEY = this.game + '_categories';

  constructor(
    private categoryService: CategoryService, 
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.categoryService.getJSON().subscribe((categories) => {
      this.categories = categories;
      const storeCategories = JSON.parse(this.storage.get(this.STORE_KEY));
      if(storeCategories) {
        this.categories = Object.assign(categories, storeCategories);
      }
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
    this.storage.remove(this.STORE_KEY);
    this.ngOnInit();
  }

  store() {
    this.storage.set(this.STORE_KEY, JSON.stringify(this.categories));
  }

}
