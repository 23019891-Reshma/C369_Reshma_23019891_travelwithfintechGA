document.addEventListener('DOMContentLoaded', function() {
    const rates = {};
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/SGD';

    function populateCurrencyDropdown(dropdown) {
        const currencies = [
            'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'JPY', 'INR', 'SGD'
        ];
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            dropdown.appendChild(option);
        });
    }

    async function fetchExchangeRates() {
        const response = await fetch(apiUrl);
        const data = await response.json();
        rates['SGD'] = 1;
        Object.assign(rates, data.rates);
        updateExchangeRates();
    }

    function updateExchangeRates() {
        const sellCurrency = document.getElementById('sellCurrency').value;
        const buyCurrency = document.getElementById('buyCurrency').value;
        const sellAmount = parseFloat(document.getElementById('sellAmount').value);
        const buyAmount = (sellAmount * rates[buyCurrency] / rates[sellCurrency]).toFixed(2);
        document.getElementById('buyAmount').value = buyAmount;
    }

    document.getElementById('sellCurrency').addEventListener('change', updateExchangeRates);
    document.getElementById('buyCurrency').addEventListener('change', updateExchangeRates);

    document.getElementById('exchangeButton').addEventListener('click', function() {
        showNotification(`Exchanged ${document.getElementById('sellAmount').value} ${document.getElementById('sellCurrency').value} to ${document.getElementById('buyAmount').value} ${document.getElementById('buyCurrency').value}.`);
        // In a real application, you would also update the user's account balance here
    });

    populateCurrencyDropdown(document.getElementById('sellCurrency'));
    populateCurrencyDropdown(document.getElementById('buyCurrency'));
    fetchExchangeRates();
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

