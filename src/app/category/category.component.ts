import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  game = environment.game;
  @Input() category: Category;

  constructor() { }

  ngOnInit() {
  }

}
