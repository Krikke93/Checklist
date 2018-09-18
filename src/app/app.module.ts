import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { GroupComponent } from './category/group/group.component';
import { ItemComponent } from './category/group/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    GroupComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
