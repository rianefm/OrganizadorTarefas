import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivrosPage } from './livros.page';

describe('LivrosPage', () => {
  let component: LivrosPage;
  let fixture: ComponentFixture<LivrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
