import { Component, OnInit, Input } from '@angular/core';
import { Settings } from './settings.model';
import { Category } from '../category/category.model';
import { CategoryService } from '../category/category.service';
import { Group } from '../category/group/group.model';
import { Item } from '../category/group/item/item.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() settings: Settings;
  @Input() categories: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

}
