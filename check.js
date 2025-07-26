
        function validateForm() {
            document.getElementById('nameError').innerText = '';
            document.getElementById('emailError').innerText = '';
            document.getElementById('messageError').innerText = '';

            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const message = document.getElementById('userMessage').value;
            let isValid = true;

            if (name.trim() === '') {
                document.getElementById('nameError').innerText = 'Name is required.';
                isValid = false;
            }

            if (email.trim() === '') {
                document.getElementById('emailError').innerText = 'Email is required.';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                document.getElementById('emailError').innerText = 'Email is invalid.';
                isValid = false;
            }

            if (message.trim() === '') {
                document.getElementById('messageError').innerText = 'Message is required.';
                isValid = false;
            }

            if (isValid) {
                event.preventDefault();

                const formData = new FormData(document.getElementById('celebrationForm'));
                const data = Object.fromEntries(formData.entries());

                fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    document.getElementById('successMessage').style.display = 'block'; 
                    document.getElementById('celebrationForm').reset(); 
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

            return false; 
        }

