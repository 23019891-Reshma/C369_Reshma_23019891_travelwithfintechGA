document.addEventListener('DOMContentLoaded', function () {
    const selectedContact = JSON.parse(localStorage.getItem('selectedContact'));
    if (selectedContact) {
        document.getElementById('recipient').value = `${selectedContact.phone} - ${selectedContact.name}`;
    } else {
        showNotification('No contact selected.');
        window.location.href = 'SMcontacts.html';
    }

    document.getElementById('sendMoneyForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const currency = document.getElementById('currency').value;
        if (currency) {
            showNotification(`Payment of ${amount} ${currency} sent to ${selectedContact.name}`);
            
            // Retrieve existing transactions from localStorage
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            
            // Deduct the amount from the total amount
            let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 2000.00;
            totalAmount -= amount;
            localStorage.setItem('totalAmount', totalAmount);

            // Store transaction details in localStorage
            transactions.push({
                description: `Payment transfer to ${selectedContact.name}`,
                amount: -amount,  // Store as negative to indicate deduction
                currency: currency,
                recipient: selectedContact
            });
            localStorage.setItem('transactions', JSON.stringify(transactions));
            localStorage.setItem('lastTransaction', JSON.stringify({ amount, currency, recipient: selectedContact }));
            setTimeout(() => {
                window.location.href = 'confirmation.html';
            }, 1000);
        } else {
            showNotification('Currently, only certain transactions are supported.');
        }
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


