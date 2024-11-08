import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PodcastsPage } from './podcasts.page';

describe('PodcastsPage', () => {
  let component: PodcastsPage;
  let fixture: ComponentFixture<PodcastsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
