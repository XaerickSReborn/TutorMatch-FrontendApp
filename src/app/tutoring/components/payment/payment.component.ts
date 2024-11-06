import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import {RegisterService} from "../../../public/services/register.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  @Input() selectedPlan: string | undefined;
  @Input() selectedPrice: number | undefined;
  paymentMethod: 'credit-card' | 'paypal' = 'credit-card';
  cardHolder = 'ㅤ';
  cardNumber = '';
  expiryDate = '';
  cvv = '';
  nameValid = true;
  cardNumberValid = true;
  expiryValid = true;
  cvvValid = true;
  formValid: boolean | string = false;
  cardType: string | null = null;

  constructor(private router: Router, private registerService: RegisterService) {}

  get cardNumberDisplay() {
    return this.cardNumber.padEnd(16, 'X').replace(/(.{4})/g, '$1 ');
  }

  setPaymentMethod(method: 'credit-card' | 'paypal') {
    this.paymentMethod = method;
    this.updateFormValidity();
  }

  validateName() {
    this.nameValid = this.cardHolder.trim().length > 0;
    this.updateFormValidity();
  }

  updateCardNumber() {
    const cleaned = this.cardNumber.replace(/\D/g, '');
    this.cardNumberValid = cleaned.length <= 16;
    this.cardNumber = cleaned;
    this.determineCardType();
    this.updateFormValidity();
  }

  determineCardType() {
    if (this.cardNumber.length < 2) {
      this.cardType = null;
      return;
    }

    const cardNumberPrefix = this.cardNumber.substring(0, 2);

    if (cardNumberPrefix >= '34' && cardNumberPrefix <= '37') {
      this.cardType = 'American Express';
    } else if (cardNumberPrefix >= '40' && cardNumberPrefix <= '49') {
      this.cardType = 'Visa';
    } else if (cardNumberPrefix >= '51' && cardNumberPrefix <= '55') {
      this.cardType = 'Mastercard';
    } else if (cardNumberPrefix >= '60' && cardNumberPrefix <= '65') {
      this.cardType = 'Discover';
    } else {
      this.cardType = null;
    }
  }

  validateExpiry() {
    this.expiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(this.expiryDate);
    this.updateFormValidity();
  }

  validateCVV() {
    const cleaned = this.cvv.replace(/\D/g, '');
    this.cvvValid = cleaned.length === 3 || cleaned.length === 4;
    this.cvv = cleaned;
    this.updateFormValidity();
  }

  isCreditCardValid() {
    return this.nameValid && this.cardNumberValid && this.expiryValid && this.cvvValid &&
      this.cardHolder && this.cardNumber && this.expiryDate && this.cvv;
  }

  updateFormValidity() {
    this.formValid = this.paymentMethod !== 'credit-card' || this.isCreditCardValid();
  }

  onSubmit() {
    if (this.formValid) {
      const pendingTutor = sessionStorage.getItem('pendingTutor');
      if (pendingTutor) {
        const tutorData = JSON.parse(pendingTutor);

        this.registerService.setUserRole(tutorData.role);
        this.registerService.registerUser(tutorData).subscribe({
          next: (response) => {
            console.log('Tutor registrado correctamente:', response);
            localStorage.setItem('currentUser', JSON.stringify(response));
            sessionStorage.removeItem('pendingTutor');
            this.router.navigate(['/Dashboard']).then();
          },
          error: (error) => {
            console.error('Error al registrar el tutor:', error);
          }
        });
      }
    }
  }

  openPayPalLogin() {
    window.open('https://www.paypal.com/signin', '_blank', 'width=500,height=600');
  }
}
