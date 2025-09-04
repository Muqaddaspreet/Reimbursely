import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAddDataComponent } from './emp-add-data.component';

describe('EmpAddDataComponent', () => {
  let component: EmpAddDataComponent;
  let fixture: ComponentFixture<EmpAddDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpAddDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpAddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
