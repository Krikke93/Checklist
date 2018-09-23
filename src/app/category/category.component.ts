import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { CategoryService } from 'src/app/category/category.service';
import { Settings } from '../settings/settings.model';
import { LocalStorageService } from '../storage/local-storage.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  game = environment.game;
  @Input() category: Category;
  @Input() settings: Settings;
  initialMinimized: boolean;
  minimized: boolean;

  constructor(private categoryService: CategoryService, private storage: LocalStorageService) { }

  ngOnInit() {
    this.initialMinimized = this.storage.getMinimized(this.category.src);
    this.minimized = this.initialMinimized;
  }

  allChecked(category: Category): boolean {
    return this.categoryService.categoryAllChecked(category);
  }

  allUnChecked(category: Category): boolean {
    return this.categoryService.categoryAllUnChecked(category);
  }

  visible(category: Category): boolean {
    return !this.categoryService.categoryAllInvisible(category, this.settings);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.storage.storeMinimized(this.category.src, this.minimized);
  }

}
