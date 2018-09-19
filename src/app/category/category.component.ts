import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  game = environment.game;
  @Input() category: Category;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  allChecked(): boolean {
    return this.categoryService.categoryAllChecked(this.category);
  }

}
