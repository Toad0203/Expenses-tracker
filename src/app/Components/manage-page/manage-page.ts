import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-page.html',
  styleUrl: './manage-page.css',
})
// export class ManagePage {
//   expenses = [
//     { title: 'Groceries', amount: 1200, where: 'Supermarket', category: 'Food' },
//     { title: 'Fuel', amount: 800, where: 'Petrol Pump', category: 'Transport' },
//     { title: 'Lunch', amount: 300, where: 'Cafeteria', category: 'Food' },
//     { title: 'Books', amount: 500, where: 'Bookstore', category: 'Education' },
//   ];

//   showPopup = false;
//   popupType: 'spend' | 'earn' | null = null;

//   openPopup(type: 'spend' | 'earn') {
//     this.popupType = type;
//     this.showPopup = true;
//   }

//   closePopup() {
//     this.showPopup = false;
//     this.popupType = null;
//   }
// }
export class ManagePage {
  expenses = [
    { title: 'Groceries', amount: 1200, where: 'Supermarket', category: 'Food' },
    { title: 'Fuel', amount: 800, where: 'Petrol Pump', category: 'Transport' },
    { title: 'Lunch', amount: 300, where: 'Cafeteria', category: 'Food' },
    { title: 'Books', amount: 500, where: 'Bookstore', category: 'Education' },
  ];

  showPopup = false;
  popupType: 'spend' | 'earn' | null = null;

  // 👉 simple form fields
  formCategory = '';
  formTitle = '';
  formAmount: number | null = null;

  formWhere = '';

  openPopup(type: 'spend' | 'earn') {
    this.popupType = type;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.popupType = null;

    // reset form
    this.formCategory = '';
    this.formTitle = '';
    this.formAmount = null;
    this.formWhere = '';
  }

  submitForm() {
    // if (!this.formTitle || !this.formAmount || !this.formCategory) {
    //   return; // simple guard, no validation UI
    // }
    if (
      !this.formTitle?.trim() ||
      this.formAmount === null ||
      this.formAmount === undefined ||
      this.formCategory?.trim() === ''
    ) {
      return;
    }

    this.expenses.push({
      title: this.formTitle,
      // amount: this.formAmount,
      amount: Number(this.formAmount),

      where: this.formWhere || '—',
      category: this.formCategory,
    });

    console.log('SUBMIT FORM CALLED', this.formCategory, this.formTitle, this.formAmount);
    this.closePopup();
  }
}
