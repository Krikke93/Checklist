import { Component } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { Item } from 'src/app/category/group/item/item.model';
import { environment } from '../environments/environment';
import { CategoryService } from 'src/app/category/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  game = environment.game;
  categories: Observable<Category[]>;

  constructor(categoryService: CategoryService) {
    this.categories = categoryService.getJSON();
  }

}
