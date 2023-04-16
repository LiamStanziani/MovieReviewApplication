import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreviewpageComponent } from './addreviewpage.component';

describe('AddreviewpageComponent', () => {
  let component: AddreviewpageComponent;
  let fixture: ComponentFixture<AddreviewpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddreviewpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddreviewpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
