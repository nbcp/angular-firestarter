import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLeaderboardComponent } from './leaderboard.component';

describe('LeaderboardComponent', () => {
  let component: HomeLeaderboardComponent;
  let fixture: ComponentFixture<HomeLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
