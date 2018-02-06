import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpenseService } from '../../app/expense.service';
import { Expense } from '../../app/expense.model';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  categories: string[];
  expense: Expense;

  constructor(public navCtrl: NavController, public navParams: NavParams, public expenseService: ExpenseService) {
    this.categories = expenseService.categories;
    const expenseId = navParams.get('expenseId');
    if (expenseId) {
      this.expense = expenseService.getExpence(expenseId);
    } else {
      this.expense = {
        date: '',
        amount: 0,
        category: '',
        description: ''
      }
    }
  }

  onSave() {
    if (this.expense.id) {
      this.expenseService.updateExpense(this.expense);
    } else {
      this.expenseService.addExpense(this.expense);
    }
    this.navCtrl.pop();
  }
}
