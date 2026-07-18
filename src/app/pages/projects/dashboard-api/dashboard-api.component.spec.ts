import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardApiComponent } from './dashboard-api.component';

describe('DashboardApiComponent', () => {
  let component: DashboardApiComponent;
  let fixture: ComponentFixture<DashboardApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
