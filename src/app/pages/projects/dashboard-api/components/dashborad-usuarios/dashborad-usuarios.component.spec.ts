import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboradUsuariosComponent } from './dashborad-usuarios.component';

describe('DashboradUsuariosComponent', () => {
  let component: DashboradUsuariosComponent;
  let fixture: ComponentFixture<DashboradUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboradUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboradUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
