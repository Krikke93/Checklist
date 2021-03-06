import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/category/group/group.model';
import { Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CategoryService } from 'src/app/category/category.service';
import { Settings } from '../../settings/settings.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  game = environment.game;
  @Input() group: Group;
  @Input() settings: Settings;
  @Input() spread: boolean = false;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  allChecked(): boolean {
    return this.categoryService.groupAllChecked(this.group);
  }

  allVisibleChecked(): boolean {
    return this.categoryService.groupAllVisibleChecked(this.group, this.settings);
  }

  allUnChecked(): boolean {
    return this.categoryService.groupAllUnChecked(this.group);
  }

  isVisible(): boolean {
    return this.categoryService.isGroupVisible(this.group, this.settings);
  }

}
