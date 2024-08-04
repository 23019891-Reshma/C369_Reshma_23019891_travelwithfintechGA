document.addEventListener('DOMContentLoaded', function() {
    const topupForm = document.getElementById('topupForm');
    
    topupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const topupAmount = parseFloat(document.getElementById('topupAmount').value);
        if (isNaN(topupAmount) || topupAmount <= 0) {
            showNotification('Please enter a valid top-up amount.');
            return;
        }

        // Retrieve the current total amount from localStorage
        let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 2000.00;
        totalAmount += topupAmount;

        // Save the new total amount back to localStorage
        localStorage.setItem('totalAmount', totalAmount);

        // Add the top-up transaction to the history
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push({ description: 'Top Up', amount: topupAmount });
        localStorage.setItem('transactions', JSON.stringify(transactions));

        showNotification('Top-up successful! Redirecting to your digital wallet.');
        setTimeout(() => {
            window.location.href = 'digitalwallet.html';
        }, 1000);
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('alert', 'alert-info');
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
