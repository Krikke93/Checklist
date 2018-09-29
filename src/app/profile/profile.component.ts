import { Component, OnInit, Output, Input, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Settings } from '../settings/settings.model';
import { LocalStorageService } from '../storage/local-storage.service';
import { Category } from '../category/category.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @Input() settings: Settings;
  @Output() returnHome: EventEmitter<boolean> = new EventEmitter;
  @Output() profileChanged: EventEmitter<number> = new EventEmitter;
  @Output() profileAboutToChange: EventEmitter<number> = new EventEmitter;

  @ViewChild("editInput") inputEl: ElementRef;

  editing: number;

  constructor(private storageService: LocalStorageService) { }

  ngOnInit() {
  }

  returnToHome() {
    this.returnHome.emit(true);
  }

  toggleEditing(i: number) {
    if (this.editing === i) {
      this.editing = null;
    } else {
      this.editing = i;
      setTimeout(()=>{
        this.inputEl.nativeElement.focus();
      }, 100);
    }
  }

  removeProfile(i: number) {
    this.settings.profiles[i] = null;
    if (i == this.settings.currentProfile) {
      this.settings.currentProfile = 0;
    }
  }

  setCurrentProfile(i: number) {
    if(!this.settings.getProfile(i)) {
      return;
    }
    this.profileAboutToChange.emit(this.settings.currentProfile);
    this.settings.currentProfile = i;
    this.profileChanged.emit(i);
  }

  ngOnDestroy() {
    this.storageService.storeSettings(this.settings);
  }

}
