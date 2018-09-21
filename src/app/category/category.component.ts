import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { CategoryService } from 'src/app/category/category.service';
import { Settings } from '../settings/settings.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  game = environment.game;
  @Input() category: Category;
  @Input() settings: Settings;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
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

}
