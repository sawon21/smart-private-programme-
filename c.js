        // Predefined data (case-sensitive)
        const users = [
            { username: "John", phone: "+880123456789", userId: "UserID-001" },
            { username: "Jane", phone: "+880987654321", userId: "UserID-002" },
            { username: "Alex", phone: "+880135792468", userId: "UserID-003" }
        ];

        // Show popup message
        function showPopupMessage(message) {
            const popup = document.getElementById('popupMessage');
            popup.innerHTML = message;
            popup.style.display = "block";
            setTimeout(() => {
                popup.style.display = "none";
            }, 2000);
        }

        // Handle the button click
        document.getElementById('checkUserIdBtn').addEventListener('click', function () {
            const username = document.getElementById('username').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const userIdDiv = document.getElementById('userId');
            const errorMessageDiv = document.getElementById('errorMessage');
            const loginBtn = document.getElementById('loginBtn');
            const spinner = document.querySelector('.spinner-border');

            // Clear previous error or user ID
            userIdDiv.textContent = '';
            errorMessageDiv.textContent = '';

            if (username && phone) {
                // Show loading spinner
                this.classList.add('loading');
                spinner.style.display = 'inline-block';

                // Simulate loading process
                setTimeout(() => {
                    // Hide loading spinner
                    this.classList.remove('loading');
                    spinner.style.display = 'none';

                    // Case-sensitive search for user
                    const user = users.find(user => user.username === username && user.phone === phone);

                    if (user) {
                        userIdDiv.textContent = `Your User ID: ${user.userId}`;
                        showPopupMessage('User ID has been found!');
                        // Show login button
                        loginBtn.style.display = 'block';
                    } else {
                        errorMessageDiv.textContent = 'Invalid username or phone number.';
                    }
                }, 3000); // 3 seconds loading time
            } else {
                errorMessageDiv.textContent = 'Please enter both username and phone number!';
            }
        });

        // Redirect to index.html when login button is clicked
        document.getElementById('loginBtn').addEventListener('click', function () {
            window.location.href = 'index.html'; // Change this to the appropriate login page
        });