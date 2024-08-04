document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the total amount from localStorage
    let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 2000.00;

    // Function to format numbers to two decimal places
    function formatAmount(amount) {
        return amount.toFixed(2);
    }

    // Function to update the total amount display
    function updateTotalAmount() {
        document.getElementById('totalAmount').textContent = formatAmount(totalAmount);
    }

    // Function to add a transaction to the history
    function addTransaction(description, amount) {
        const transactionHistory = document.getElementById('transactionHistory');
        const transactionItem = document.createElement('li');
        transactionItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        transactionItem.innerHTML = `
            <div>
                <strong>${description}</strong>
                <br><small>${new Date().toLocaleDateString()}</small>
            </div>
            <span class="badge ${amount > 0 ? 'bg-success' : 'bg-danger'}">${amount > 0 ? '+' : ''}${formatAmount(amount)}</span>
        `;
        transactionHistory.prepend(transactionItem);
    }

    // Retrieve transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactions.forEach(transaction => {
        addTransaction(transaction.description, transaction.amount);
    });

    updateTotalAmount();
});



