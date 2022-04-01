//Fills in the budget from the local storage
document.querySelector('.budgetAmount').innerText = localStorage.getItem('currentBudget').slice(1,-1); 

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

    //Stores the budget value in the local storage in the browser
    let storedBudget = document.querySelector('.budgetAmount').innerText;
    localStorage.setItem('currentBudget', JSON.stringify(storedBudget));
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
    //Create an icon to delete a row
    let deleteIcon = new Image (25, 30);
    deleteIcon.src = "/img/delete.png" 
    document.querySelector('.deleteCol').appendChild(deleteIcon);
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
    //Drop the expense amount value into the H2 where it goes.
   document.querySelector('.expenseAmount').innerText = expenseTotal;
   //runs the total
   calcBalance();
   //Clears out the expense fields for the next entry
   document.querySelector('.expenseText').value = '';
   document.querySelector('.expenseName').value = '';

   //runs delete expenses function
   deleteExpenses();
    
})

function deleteExpenses () {
    document.querySelector('.deleteCol img:last-child').addEventListener('click',function(event){
        let deleteImgNodeList = document.querySelectorAll('.deleteCol img');
        let deleteH2NodeList = document.querySelectorAll('.displayedExpenses h2');
        let deleteImgArr = Array.from(deleteImgNodeList);
        let deleteH2Arr = Array.from(deleteH2NodeList);
        let deleteImgIndex = deleteImgArr.indexOf(event.target);
        let expenseToDelete = deleteH2Arr[deleteImgIndex];
        expenseArr.splice(deleteImgIndex,1);
        expenseTotal = expenseArr.reduce(function(acc, value){
            return acc += parseInt(value);
        },0);
        //Concat -$ to expense amount
        expenseTotal = `-$${expenseTotal}`;
        //Drop the expense amount value into the H2 where it goes.
        document.querySelector('.expenseAmount').innerText = expenseTotal;
        //runs the total
        calcBalance();
        //deletes the expense and the icon associated with it
        event.target.remove();
        expenseToDelete.remove();
    }) 
}

function calcBalance() {
    //grabs all the values from the page
    let budget = document.querySelector('.budgetAmount').innerText;
    budget = budget.substring(1);
    let expenses = document.querySelector('.expenseAmount').innerText;
    expenses = expenses.substring(2);
    //subtracts expenses from budget
    let total = budget - expenses;
    //displays total
    document.querySelector('.total').innerText = `$${total}`;
}
