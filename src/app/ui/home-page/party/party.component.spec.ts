import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePartyComponent } from './party.component';

describe('HomePartyComponent', () => {
  let component: HomePartyComponent;
  let fixture: ComponentFixture<HomePartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
