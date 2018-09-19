import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/category/group/group.model';
import { Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CategoryService } from 'src/app/category/category.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  game = environment.game;
  @Input() group: Group;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  allChecked(): boolean {
    return this.categoryService.groupAllChecked(this.group);
  }

}
