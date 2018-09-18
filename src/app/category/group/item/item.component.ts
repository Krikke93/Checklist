import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Item } from 'src/app/category/group/item/item.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  game = environment.game;
  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

  select() {
    this.item.checked = !this.item.checked;
  }

}
