// Set cache version
const CACHE_VERSION = '1.0.0'; // Update this version whenever you want to clear the cache

// Check if the cache version is stored and if it's different from the current version
const storedCacheVersion = localStorage.getItem('cacheVersion');
if (storedCacheVersion !== CACHE_VERSION) {
    // Cache is outdated, clear it
    localStorage.clear();  // You can clear specific items if needed
    localStorage.setItem('cacheVersion', CACHE_VERSION); // Set the new version
    // Optionally, reload the page to reflect new cache data
    window.location.reload();
}

// Add event listener for form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get user input
    let phoneNumber = document.getElementById('phoneNumber').value;
    const userId = document.getElementById('userId').value;

    // Example credentials for demonstration
    const validCredentials = [
        { phone: '1122', userId: '1122' },
        { phone: '3344', userId: '3344' },
        { phone: '+885556667777', userId: 'user789' }
    ];

    // Check if the entered credentials match any in the examples
    const isValid = validCredentials.some(cred => cred.phone === phoneNumber && cred.userId === userId);

    // Show notification
    const toastMessage = document.getElementById('toastMessage');
    const loginToast = new bootstrap.Toast(document.getElementById('loginToast'));

    if (isValid) {
        toastMessage.textContent = 'Login successful!';
        document.getElementById('loginToast').querySelector('.toast-header i').classList.replace('bi-check-circle-fill', 'bi-check-circle');
        document.getElementById('loginToast').querySelector('.toast-header i').classList.add('text-success');
        loginToast.show();
        
        // Save login status and user info to localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userPhone', phoneNumber);
        localStorage.setItem('userId', userId);
        
        // Redirect to main.html after login
        window.location.href = 'main.html';
    } else {
        toastMessage.textContent = 'Invalid phone number or user ID.';
        document.getElementById('loginToast').querySelector('.toast-header i').classList.replace('bi-check-circle-fill', 'bi-x-circle-fill');
        document.getElementById('loginToast').querySelector('.toast-header i').classList.add('text-danger');
        loginToast.show();
    }
});

// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordField = document.getElementById('userId');
    const passwordIcon = this.querySelector('i');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordIcon.classList.remove('bi-eye');
        passwordIcon.classList.add('bi-eye-slash');
    } else {
        passwordField.type = 'password';
        passwordIcon.classList.remove('bi-eye-slash');
        passwordIcon.classList.add('bi-eye');
    }
});