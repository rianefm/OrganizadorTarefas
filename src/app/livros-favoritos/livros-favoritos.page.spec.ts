import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LivrosFavoritosPage } from './livros-favoritos.page';

describe('LivrosFavoritosPage', () => {
  let component: LivrosFavoritosPage;
  let fixture: ComponentFixture<LivrosFavoritosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrosFavoritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
