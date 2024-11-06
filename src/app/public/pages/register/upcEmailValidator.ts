import { AbstractControl, ValidationErrors } from '@angular/forms';

export function upcEmailValidator(control: AbstractControl): ValidationErrors | null {
  const email: string = control.value || '';
  const domain = '@upc.edu.pe';
  if (email.endsWith(domain)) {
    return null;
  } else {
    return { invalidEmailDomain: true };
  }
}