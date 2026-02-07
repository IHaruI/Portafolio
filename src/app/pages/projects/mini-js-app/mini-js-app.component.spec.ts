import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniJsAppComponent } from './mini-js-app.component';

describe('MiniJsAppComponent', () => {
  let component: MiniJsAppComponent;
  let fixture: ComponentFixture<MiniJsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniJsAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniJsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
