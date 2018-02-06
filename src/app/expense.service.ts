import { Expense } from './expense.model'
import uuidV4 from 'uuid/v4';

export class ExpenseService {

  categories = ['Food', 'Travel', 'Other'];
  expenses = this.loadExpenses();

  addExpense(expense: Expense) {
    expense.id = uuidV4();
    this.expenses.push(expense);
    this.storeExpenses();
  }
  getExpence(expenseId: string) {
    const expense = this.expenses.find(it => it.id === expenseId);
    return Object.assign({}, expense);
  }
  updateExpense(expense: Expense) {
    const index = this.expenses.findIndex(it => it.id === expense.id);
    this.expenses[index] = expense;
    this.storeExpenses();
  }
  removeExpense(expenseId: string) {
    const index = this.expenses.findIndex(it => it.id === expenseId);
    this.expenses.splice(index, 1);
    this.storeExpenses();
  }

  private loadExpenses(): Expense[] {
    const expenses = localStorage.getItem('expenses');
    if (expenses) {
      return JSON.parse(expenses);
    } else {
      return [];
    }
  }

  private storeExpenses() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }

}