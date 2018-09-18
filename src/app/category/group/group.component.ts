import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/category/group/group.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  @Input() group: Group;

  constructor() { }

  ngOnInit() {
  }

}
