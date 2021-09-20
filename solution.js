console.clear(); // CLEAR CONSOLE EVERY RUN

const TICKET_PRICE = 25;

function tryPay(amount, cash, bills) {
  const currentBills = bills || [];
  const cashSum = currentBills.reduce((a, b) => a + b, 0);
  if (cashSum === amount) {
    return [true, currentBills];
  }
  if (cashSum >= amount) {
    return [false];
  }
  for (let index = 0; index < cash.length; index++) {
    const [can, bills] = tryPay(amount, cash.slice(index + 1), currentBills.concat(cash[index]));
    if (can) {
      return [true, bills];
    }
  }
  return [false];
}

const tickets = (payments) => {
  let cash = [];
  return !payments.some((payment) => {
    if (payment < TICKET_PRICE) {
      return true;
    } else if (payment === TICKET_PRICE) {
      cash.push(payment);
    } else {
      const [success, usedBills] = tryPay(payment - TICKET_PRICE, cash);
      if (!success) return true;
      usedBills.forEach((usedBill) => {
        const billIndex = cash.findIndex((bill) => bill === usedBill);
        cash.splice(billIndex, 1);
      });
      cash.push(payment);
    }
  });
};

console.log([25], ' Expected: true >', tickets([25]));
console.log([25, 25, 50], ' Expected: true >', tickets([25, 25, 50]));
console.log([25, 25, 25, 50], ' Expected: true >', tickets([25, 25, 25, 50]));
console.log([25, 25, 25, 50, 100], ' Expected: true >', tickets([25, 25, 25, 50, 100]));
console.log([25, 25, 25, 100], ' Expected: true >', tickets([25, 25, 25, 100]));
console.log([25, 100], ' Expected: false >', tickets([25, 100]));
console.log([25, 25, 50, 50, 100], ' Expected: false >', tickets([25, 25, 50, 50, 100]));
