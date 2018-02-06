import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ExpenseService } from '../../app/expense.service';
import { Expense } from '../../app/expense.model';


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  categories: string[];
  expense: Expense;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController,
              public expenseService: ExpenseService) {
    this.categories = expenseService.categories;
    this.expense = {
      date: '',
      amount: 0,
      category: '',
      description: ''
    };
    const expenseId = navParams.get('expenseId');
    if (expenseId) {
      expenseService.getExpense(expenseId)
          .then(expense => this.expense = expense);
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

  onTrash(){
    this.showConfirm();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: `Are you sure you want to delete this expense: "${this.expense.description}"?`,
      buttons: [
        {
          text: 'Cancel' },
        {
          text: 'Confirm',
          handler: () => {
            this.expenseService.removeExpense(this.expense.id);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }
}
