import { Component, OnInit, Input } from '@angular/core';
import { VersionLog } from '../version-log.model';

@Component({
  selector: 'app-versionlog',
  templateUrl: './versionlog.component.html',
  styleUrls: ['./versionlog.component.css']
})
export class VersionlogComponent implements OnInit {

  @Input() versionLog: VersionLog;

  constructor() { }

  ngOnInit() {
  }

}
