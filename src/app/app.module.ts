import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { GroupComponent } from './category/group/group.component';
import { ItemComponent } from './category/group/item/item.component';
import { CategoryService } from 'src/app/category/category.service';
import { HttpModule } from '@angular/http';
import { StorageServiceModule} from 'angular-webstorage-service';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    GroupComponent,
    ItemComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StorageServiceModule
  ],
  providers: [
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
