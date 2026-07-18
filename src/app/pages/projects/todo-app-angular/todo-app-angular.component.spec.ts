import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAppAngularComponent } from './todo-app-angular.component';

describe('TodoAppAngularComponent', () => {
  let component: TodoAppAngularComponent;
  let fixture: ComponentFixture<TodoAppAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoAppAngularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoAppAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
