document.addEventListener('DOMContentLoaded', function() {
    // Function to show notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('alert', 'alert-info');
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Retrieve transactions from localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let totalMoneyIn = 0;
    let totalMoneyOut = 0;

    // Calculate the total money in and out
    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            totalMoneyIn += transaction.amount;
        } else {
            totalMoneyOut += Math.abs(transaction.amount);
        }
    });

    // Update the total money in and out
    document.getElementById('totalMoneyIn').textContent = totalMoneyIn.toFixed(2);
    document.getElementById('totalMoneyOut').textContent = totalMoneyOut.toFixed(2);

    // Create the money flow chart
    const ctx = document.getElementById('moneyFlowChart').getContext('2d');
    const moneyFlowChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Money In', 'Money Out'],
            datasets: [{
                label: 'Money Flow (SGD)',
                data: [totalMoneyIn, totalMoneyOut],
                backgroundColor: ['#4caf50', '#f44336'],
                borderColor: ['#388e3c', '#d32f2f'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black'
                    }
                },
                x: {
                    ticks: {
                        color: 'black'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'black'
                    }
                }
            }
        }
    });

    // Handle savings goal
    let savingsGoalEnabled = false;
    let savingsGoalAmount = 0;

    const toggleSavingsGoalButton = document.getElementById('toggleSavingsGoal');
    const savingsGoalAmountInput = document.getElementById('savingsGoalAmount');

    toggleSavingsGoalButton.addEventListener('click', function() {
        savingsGoalEnabled = !savingsGoalEnabled;
        if (savingsGoalEnabled) {
            toggleSavingsGoalButton.textContent = 'Disable Savings Goal';
            toggleSavingsGoalButton.classList.remove('btn-primary');
            toggleSavingsGoalButton.classList.add('btn-success');
            savingsGoalAmount = parseFloat(savingsGoalAmountInput.value);
            if (isNaN(savingsGoalAmount) || savingsGoalAmount <= 0) {
                showNotification('Please enter a valid savings goal amount.');
                savingsGoalEnabled = false;
                toggleSavingsGoalButton.textContent = 'Enable Savings Goal';
                toggleSavingsGoalButton.classList.remove('btn-success');
                toggleSavingsGoalButton.classList.add('btn-primary');
            } else {
                showNotification(`Savings goal set to ${savingsGoalAmount.toFixed(2)} SGD.`);
            }
        } else {
            toggleSavingsGoalButton.textContent = 'Enable Savings Goal';
            toggleSavingsGoalButton.classList.remove('btn-success');
            toggleSavingsGoalButton.classList.add('btn-primary');
            showNotification('Savings goal disabled.');
        }
    });

    // Prevent spending over the savings goal amount
    if (savingsGoalEnabled) {
        transactions.forEach(transaction => {
            if (transaction.amount < 0 && Math.abs(transaction.amount) > savingsGoalAmount) {
                showNotification('Transaction exceeds the savings goal amount.');
                // Prevent the transaction (this is a simplified example)
            }
        });
    }
});
