//When button is clicked for budget
document.querySelector('.budgetSubmit').addEventListener('click', function(event){
    //prevent the page from reloading when the button is clicked
    event.preventDefault();
    //Stores budget amount entered into a variable
    let budgetAmount = document.querySelector('.budgetText').value;
    //Concat $ to budget amount
    budgetAmount = `$${budgetAmount}`;
    //Drop the budget amount value into the H2 where it goes.
    document.querySelector('.budgetAmount').innerText = budgetAmount;
    //runs the total
    calcBalance();
});


let expenseArr = [];
//When button is clicked for expense
document.querySelector('.expenseSubmit').addEventListener('click', function(event){ 
    //prevent the page from reloading when the button is clicked
    event.preventDefault();
    //Stores expense amount entered into a variable
    let expenseAmount = document.querySelector('.expenseText').value;
    //Stores name of the expense entered into a variable
    let expenseName = document.querySelector('.expenseName').value;
    //Create an H2 element and shove it into the dislayed expenses div
    let expenseElement = document.createElement('h2');
    document.querySelector('.displayedExpenses').appendChild(expenseElement);
    expenseElement.innerText = `${expenseName}: $${expenseAmount}`;
    //push the expense value into an array and total it
    expenseArr.push(expenseAmount);
    let expenseTotal = expenseArr.reduce(function(acc, value){
        return acc += parseInt(value);
    },0);

    //Concat -$ to expense amount
    expenseTotal = `-$${expenseTotal}`;
    //Drop the budget amount value into the H2 where it goes.
   document.querySelector('.expenseAmount').innerText = expenseTotal;
   //runs the total
   calcBalance();
   document.querySelector('.expenseText').value = '';
   document.querySelector('.expenseName').value = '';
});

function calcBalance() {
    //grabs all the values from the page
    let budget = document.querySelector('.budgetAmount').innerText;
    budget = budget.substring(1);
    console.log(budget);
    let expenses = document.querySelector('.expenseAmount').innerText;
    expenses = expenses.substring(2);
    //subtracts expenses from budget
    let total = budget - expenses;
    //displays total
    document.querySelector('.total').innerText = `$${total}`;
}





