import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailsPage } from './book-details.page';

describe('BookDetailsPage', () => {
  let component: BookDetailsPage;
  let fixture: ComponentFixture<BookDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
