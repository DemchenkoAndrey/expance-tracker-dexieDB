import { Expense } from './expense.model'
  
export class ExpenseService {

  categories = ['Food', 'Travel', 'Other'];
  expenses: Expense[] = [
    {
      id: 1,
      date: '2016-01-01',
      amount: 7.25,
      category: 'Food',
      description: 'Lunch'
    },
    {
      id: 2,
      date: '2016-01-02',
      amount: 17.25,
      category: 'Travel',
      description: 'Train ticket'
    },
    {
      id: 3,
      date: '2016-01-02',
      amount: 9.25,
      category: 'Food',
      description: 'Dinner'
    }
  ];
  addExpense(expense: Expense) {
    let length = this.expenses.length + 1;
    expense.id = length++;
    this.expenses.push(expense);
  }
  getExpence(expenseId: number) {
    const expense = this.expenses.find(it => it.id === expenseId);
    return Object.assign({}, expense);
  }
  updateExpense(expense: Expense) {
   const index = this.expenses.findIndex(it => it.id === expense.id);
    this.expenses[index] = expense;
  }
}