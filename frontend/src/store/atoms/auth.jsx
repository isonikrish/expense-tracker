import { atom } from 'recoil';
const currencyOptions = [
  { value: 'USD', label: 'USD - United States Dollar ($)', symbol: '$' },
  { value: 'EUR', label: 'EUR - Euro (€)', symbol: '€' },
  { value: 'GBP', label: 'GBP - British Pound (£)', symbol: '£' },
  { value: 'INR', label: 'INR - Indian Rupee (₹)', symbol: '₹' },
  { value: 'JPY', label: 'JPY - Japanese Yen (¥)', symbol: '¥' },
  { value: 'AUD', label: 'AUD - Australian Dollar (A$)', symbol: 'A$' },
];
export const currencyAtom = atom({
  key: 'currencyAtom',
  default: null
});

export const user = atom({
  key: 'user',
  default: null,
});
export const isUserThere = atom({
  key: "isUserThere",
  default: false
})
export const currencyOptionsAtom = atom({
  key: 'currencyOptionsAtom',
  default: currencyOptions,
});
export const typeAtom = atom({
  key: "typeAtom",
  default: "income"
})
export const expenseTransactions = atom({
  key: "expenseTransactions",
  default: null
})
export const transactionHistory = atom({
  key: "transactionHistory",
  default: null
})