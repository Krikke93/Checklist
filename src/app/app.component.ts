import { Component } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { environment } from '../environments/environment';
import { CategoryService } from 'src/app/category/category.service';
import { OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  game = environment.game;
  categories: Category[];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categoryService.getJSON().subscribe((categories) => {
      this.categories = categories;
      this.categoryService.loadAll(this.categories);
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
    this.categoryService.eraseAll(this.categories);
    this.ngOnInit();
  }

  store() {
    this.categoryService.storeAll(this.categories);
  }

}
