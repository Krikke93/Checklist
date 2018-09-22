import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category } from '../category/category.model';
import { Settings } from '../settings/settings.model';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  game = environment.game;
  @Input() categories: Category[];
  @Input() settings: Settings;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  visible(category: Category): boolean {
    return !this.categoryService.categoryAllInvisible(category, this.settings);
  }

}
