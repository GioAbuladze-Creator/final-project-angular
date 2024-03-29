import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBarComponent } from './category-bar.component';

describe('CategoryBarComponent', () => {
  let component: CategoryBarComponent;
  let fixture: ComponentFixture<CategoryBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CategoryBarComponent]
    });
    fixture = TestBed.createComponent(CategoryBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
