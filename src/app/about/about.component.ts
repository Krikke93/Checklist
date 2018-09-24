import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Settings } from '../settings/settings.model';
import { VersionService } from './version.service';
import { VersionLog } from './version-log.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  game = environment.game;
  gameUrl = environment.gameUrl;
  version: string = "unknown";
  logs: VersionLog[] = [];

  @Input() settings: Settings;
  @Output() returnHome: EventEmitter<boolean> = new EventEmitter;

  constructor(private versionService: VersionService) { }

  ngOnInit() {
    this.versionService.getLogsJSON().subscribe((logs) => {
      this.logs = logs;
      this.version = logs[0].version;
    });
  }

  returnToHome() {
    this.returnHome.emit(true);
  }

}
