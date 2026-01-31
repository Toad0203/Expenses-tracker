import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizePage } from './personalize-page';

describe('PersonalizePage', () => {
  let component: PersonalizePage;
  let fixture: ComponentFixture<PersonalizePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalizePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
