import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VestaPedigreeDendrogramsComponent } from './vesta-pedigree-dendrograms.component';

describe('VestaPedigreeDendrogramsComponent', () => {
  let component: VestaPedigreeDendrogramsComponent;
  let fixture: ComponentFixture<VestaPedigreeDendrogramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VestaPedigreeDendrogramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VestaPedigreeDendrogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
