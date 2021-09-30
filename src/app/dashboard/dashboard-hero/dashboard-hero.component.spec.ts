import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { first } from 'rxjs/operators';

import { Hero } from '../../model/hero';
import { DashboardHeroComponent } from './dashboard-hero.component';

describe('DashboardHeroComponent', () => {
  let component: DashboardHeroComponent;
  let fixture: ComponentFixture<DashboardHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


/* 14 */describe('DashboardHeroComponent class only', () => {
  it('raises the selected event when clicked', () => {
    const dashboardHeroComponent = new DashboardHeroComponent();
    const hero: Hero = {
      name: 'Test',
      id: 42
    };
    dashboardHeroComponent.hero = hero;

    dashboardHeroComponent.selected.pipe(first()).subscribe(
      (selectedHero: Hero) => {
        expect(selectedHero).toBe(hero);
      }
    );

    dashboardHeroComponent.click();
  });
});