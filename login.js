document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    
    if (username === 'user123' && email === 'user123@gmail.com') {
        window.location.href = 'otp.html';
    } else {
        alert('Invalid username or email.');
    }
});
