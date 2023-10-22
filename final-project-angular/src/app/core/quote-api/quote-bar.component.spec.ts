import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteApiComponent } from './quote-bar.component';

describe('QuoteApiComponent', () => {
  let component: QuoteApiComponent;
  let fixture: ComponentFixture<QuoteApiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuoteApiComponent]
    });
    fixture = TestBed.createComponent(QuoteApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
