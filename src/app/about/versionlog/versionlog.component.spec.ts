import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionlogComponent } from './versionlog.component';

describe('VersionlogComponent', () => {
  let component: VersionlogComponent;
  let fixture: ComponentFixture<VersionlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
