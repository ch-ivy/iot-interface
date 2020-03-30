import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IamgeComponent } from './iamge.component';

describe('IamgeComponent', () => {
  let component: IamgeComponent;
  let fixture: ComponentFixture<IamgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IamgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IamgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
