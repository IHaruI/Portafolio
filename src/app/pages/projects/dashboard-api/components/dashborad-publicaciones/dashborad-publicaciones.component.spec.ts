import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboradPublicacionesComponent } from './dashborad-publicaciones.component';

describe('DashboradPublicacionesComponent', () => {
  let component: DashboradPublicacionesComponent;
  let fixture: ComponentFixture<DashboradPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboradPublicacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboradPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
