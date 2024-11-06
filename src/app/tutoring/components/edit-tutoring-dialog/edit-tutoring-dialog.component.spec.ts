import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTutoringDialogComponent } from './edit-tutoring-dialog.component';

describe('EditTutoringDialogComponent', () => {
  let component: EditTutoringDialogComponent;
  let fixture: ComponentFixture<EditTutoringDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTutoringDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTutoringDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
