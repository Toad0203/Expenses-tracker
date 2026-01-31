import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-page',
  imports: [CommonModule],
  templateUrl: './manage-page.html',
  styleUrl: './manage-page.css',
})
export class ManagePage {
  expenses = [
    { title: 'Groceries', amount: 1200, where: 'Supermarket', category: 'Food' },
    { title: 'Fuel', amount: 800, where: 'Petrol Pump', category: 'Transport' },
    { title: 'Lunch', amount: 300, where: 'Cafeteria', category: 'Food' },
    { title: 'Books', amount: 500, where: 'Bookstore', category: 'Education' },
  ];

  showPopup = false;
  popupType: 'spend' | 'earn' | null = null;

  openPopup(type: 'spend' | 'earn') {
    this.popupType = type;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.popupType = null;
  }
}
