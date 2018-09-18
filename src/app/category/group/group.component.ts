import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/category/group/group.model';
import { Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  game = environment.game;
  @Input() group: Group;

  constructor() { }

  ngOnInit() {
  }

}
