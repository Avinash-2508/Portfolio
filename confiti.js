function validateForm() {
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('messageError').innerText = '';
    let isValid = true;

    // Validate Name
    const name = document.getElementById('userName').value.trim();
    if (name.length < 1) {
        document.getElementById('nameError').innerText = 'Name is too Short.';
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('userEmail').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    if (email.length < 1) {
        document.getElementById('emailError').innerText = 'Please Enter your Mail.';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Invalid email address.';
        isValid = false;
    }

    // Validate Message
    const message = document.getElementById('userMessage').value.trim();
    if (message.length < 1) {
        document.getElementById('messageError').innerText = 'Message is required.';
        isValid = false;
    }

    return isValid; // Return validation status
}

document.addEventListener('DOMContentLoaded', function() {
    // Form element and success message
    const form = document.getElementById('celebrationForm');
    const successMessage = document.getElementById('successMessage');
    const confettiContainer = document.getElementById('confetti-container');

    // Confetti colors and shapes definition
    const colors = [
        '#f94144', '#f3722c', '#f8961e', '#f9c74f', 
        '#90be6d', '#43aa8b', '#4d908e', '#577590', 
        '#277da1', '#ff66c4', '#9b5de5'
    ];
    
    const shapes = ['square', 'triangle', 'circle'];

    // Form submission event
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Validate form input
        if (validateForm()) {
            // Show success message
            successMessage.style.display = 'block';

            // Create confetti celebration
            createConfetti();

            // Reset form after a delay
            setTimeout(() => {
                form.reset();
                successMessage.style.display = 'none'; // Hide success message after reset
            }, 3000);
        }
    });
    
    // Function to create confetti
    function createConfetti() {
        const confettiCount = 250; // Number of confetti pieces
        confettiContainer.innerHTML = ''; // Clear existing confetti

        // Create confetti pieces
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');

                // Random position, color, shape and size
                const size = Math.random() * 10 + 6; // Between 6-16px
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100; // Random horizontal position
                
                // Apply styles
                confetti.className = `confetti ${shape}`;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.backgroundColor = color;
                confetti.style.left = `${left}%`;
                confetti.style.top = '-20px';
                confetti.style.opacity = '1';
                
                // Set random rotation
                const rotation = Math.random() * 360;
                confetti.style.transform = `rotate(${rotation}deg)`;
                
                // Add to container
                confettiContainer.appendChild(confetti);
                
                // Animate falling
                animateConfetti(confetti);
            }, i * 20); // Stagger creation for better effect
        }
    }
    
    // Function to animate a single confetti piece
    function animateConfetti(element) {
        const horizontalMovement = (Math.random() - 0.5) * 15; // Random horizontal movement
        const fallSpeed = Math.random() * 3 + 2; // Set random fall speed
        const spinSpeed = Math.random() * 15 - 7.5; // Set random spin speed

        let top = -20; // Starting position
        let rotation = Math.random() * 360; // Random rotation
        let opacity = 1; // Opacity
        let horizontalPos = parseFloat(element.style.left); // Horizontal position
        
        // Animation function
        function fall() {
            top += fallSpeed; // Update vertical position
            rotation += spinSpeed; // Update rotation
            horizontalPos += horizontalMovement / 10; // Update horizontal position

            // Update element styles
            element.style.top = `${top}px`;
            element.style.transform = `rotate(${rotation}deg)`;
            element.style.left = `${horizontalPos}%`;

            // Fade out as it falls past 70% of screen height
            if (top > window.innerHeight * 0.7) {
                opacity -= 0.03;
                element.style.opacity = opacity;
            }

            // Continue animation until off-screen or fully transparent
            if (top < window.innerHeight && opacity > 0) {
                requestAnimationFrame(fall);
            } else {
                // Remove confetti from DOM when animation completes
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }
        }
        
        // Start animation
        requestAnimationFrame(fall);
    }
});
