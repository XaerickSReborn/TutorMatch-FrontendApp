import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatButton,
    MatInput,
    MatLabel,
    TranslateModule,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  currentUser: any;
  imageUploaded: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private translate: TranslateService
  ) {
    this.settingsForm = this.fb.group({
      avatar: [null],
      gender: [null],
      cycle: [null, [Validators.required, Validators.min(1), Validators.max(10)]]
    });
  }

  /**
   * @method ngOnInit
   * @description Lifecycle hook that is called after the component's constructor.
   */
  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.populateForm();
    }
  }

  /**
   * @method populateForm
   * @description Populates the form with the current user's data.
   */

  populateForm() {
    this.settingsForm.patchValue({
      avatar: this.currentUser.avatar,
      gender: this.currentUser.gender,
      cycle: this.currentUser.cycle
    });
  }

  /**
   * @method onSave
   * @description Updates the user's data and navigates to the dashboard page.
   */

  onSave() {
    if (this.settingsForm.valid) {
      const updatedUser = {
        ...this.currentUser,
        ...this.settingsForm.value
      };
      this.registerService.updateUser(updatedUser, this.currentUser.id).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          localStorage.setItem('currentUser', JSON.stringify(response));
          window.history.back();
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * @method onFileSelected
   * @param event
   * @description Handles the file selected event and updates the avatar image.
   */

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.settingsForm.patchValue({ avatar: e.target.result });
          this.imageUploaded = true;
          this.errorMessage = '';
        };
        reader.readAsDataURL(file);
      } else {
        this.translate.get('footer.pInvalidFileType').subscribe((res: string) => {
          this.errorMessage = res;
        });
        this.imageUploaded = false;
      }
    }
  }

  /**
   * @method goBack
   * @param event
   * @description Navigates back to the previous page.
   */

  goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }
}
