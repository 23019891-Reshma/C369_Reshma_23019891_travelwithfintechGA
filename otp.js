document.addEventListener('DOMContentLoaded', function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    showNotification('Your OTP is ' + otp);
    
    let timeLeft = 60;
    const timerElement = document.getElementById('timer');
    const interval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(interval);
            timerElement.innerText = '0:00';
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);

    document.getElementById('otpForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const enteredOtp = document.getElementById('otp').value;
        if (enteredOtp === otp) {
            showNotification('OTP verified successfully!');
            setTimeout(() => {
                window.location.href = 'digitalwallet.html';
            }, 1000);
        } else {
            showNotification('Invalid OTP. Please try again.');
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

