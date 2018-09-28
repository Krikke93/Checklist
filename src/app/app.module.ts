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
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { VersionlogComponent } from './about/versionlog/versionlog.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    GroupComponent,
    ItemComponent,
    SettingsComponent,
    NavigationComponent,
    AboutComponent,
    VersionlogComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StorageServiceModule,
    FormsModule
  ],
  providers: [
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
