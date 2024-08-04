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
    let totalSpent = 0;

    // Calculate the total amount spent
    transactions.forEach(transaction => {
        if (transaction.amount < 0) {
            totalSpent += Math.abs(transaction.amount);
        }
    });

    // Update the spent amount and progress bar
    const spentAmountElement = document.getElementById('spentAmount');
    const progressBarElement = document.getElementById('progressBar');
    spentAmountElement.textContent = totalSpent.toFixed(2);

    const progress = (totalSpent / 50000) * 100;
    progressBarElement.style.width = progress + '%';
    progressBarElement.setAttribute('aria-valuenow', progress);

    // Show notification if nearing the goal
    if (progress >= 80 && progress < 100) {
        showNotification('You are close to reaching the Gold Tier!');
    } else if (progress >= 100) {
        showNotification('Congratulations! You have reached the Gold Tier!');
    }
    // green redeem button  turns red when pressed
    const redeemButtons = document.querySelectorAll('.redeem-btn');
    redeemButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            button.textContent = 'Has been redeemed';
            button.classList.add('redeemed');
            button.classList.remove('btn-success');
            button.classList.add('btn-danger');
            button.disabled = true;
        });
    }); 
});
