
        function validateForm() {
            // Clear previous error messages
            document.getElementById('nameError').innerText = '';
            document.getElementById('emailError').innerText = '';
            document.getElementById('messageError').innerText = '';

            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const message = document.getElementById('userMessage').value;
            let isValid = true;

            // Validate Name
            if (name.trim() === '') {
                document.getElementById('nameError').innerText = 'Name is required.';
                isValid = false;
            }

            // Validate Email
            if (email.trim() === '') {
                document.getElementById('emailError').innerText = 'Email is required.';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                document.getElementById('emailError').innerText = 'Email is invalid.';
                isValid = false;
            }

            // Validate Message
            if (message.trim() === '') {
                document.getElementById('messageError').innerText = 'Message is required.';
                isValid = false;
            }

            if (isValid) {
                // Prevent default form submission
                event.preventDefault();

                const formData = new FormData(document.getElementById('celebrationForm'));
                const data = Object.fromEntries(formData.entries());

                // Send data to the server
                fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data); // Handle the response from the server
                    document.getElementById('successMessage').style.display = 'block'; // Show success message
                    document.getElementById('celebrationForm').reset(); // Reset the form
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

            return false; // Prevent form submission
        }

