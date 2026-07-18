import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTasksComponent } from './app-tasks.component';

describe('AppTasksComponent', () => {
  let component: AppTasksComponent;
  let fixture: ComponentFixture<AppTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
