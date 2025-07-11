function validateForm() {
    document.getElementById('nameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('messageError').innerText = '';
    let isValid = true;

    const name = document.getElementById('userName').value.trim();
    if (name.length < 1) {
        document.getElementById('nameError').innerText = 'Name is too Short.';
        isValid = false;
    }

    const email = document.getElementById('userEmail').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (email.length < 1) {
        document.getElementById('emailError').innerText = 'Please Enter your Mail.';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Invalid email address.';
        isValid = false;
    }

    const message = document.getElementById('userMessage').value.trim();
    if (message.length < 1) {
        document.getElementById('messageError').innerText = 'Message is required.';
        isValid = false;
    }

    return isValid; 
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('celebrationForm');
    const successMessage = document.getElementById('successMessage');
    const confettiContainer = document.getElementById('confetti-container');

    const colors = [
        '#f94144', '#f3722c', '#f8961e', '#f9c74f', 
        '#90be6d', '#43aa8b', '#4d908e', '#577590', 
        '#277da1', '#ff66c4', '#9b5de5'
    ];
    
    const shapes = ['square', 'triangle', 'circle'];

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        if (validateForm()) {
            successMessage.style.display = 'block';

            createConfetti();

            setTimeout(() => {
                form.reset();
                successMessage.style.display = 'none'; 
            }, 3000);
        }
    });
    
    function createConfetti() {
        const confettiCount = 250;
        confettiContainer.innerHTML = ''; 

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');

                const size = Math.random() * 10 + 6; 
                const shape = shapes[Math.floor(Math.random() * shapes.length)];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const left = Math.random() * 100; 
                
                confetti.className = `confetti ${shape}`;
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.backgroundColor = color;
                confetti.style.left = `${left}%`;
                confetti.style.top = '-20px';
                confetti.style.opacity = '1';
                
                const rotation = Math.random() * 360;
                confetti.style.transform = `rotate(${rotation}deg)`;
                
                confettiContainer.appendChild(confetti);
                
                animateConfetti(confetti);
            }, i * 20); 
        }
    }
    
    function animateConfetti(element) {
        const horizontalMovement = (Math.random() - 0.5) * 15; 
        const fallSpeed = Math.random() * 3 + 2; 
        const spinSpeed = Math.random() * 15 - 7.5;

        let top = -20; 
        let rotation = Math.random() * 360; 
        let opacity = 1;
        let horizontalPos = parseFloat(element.style.left);
        
        function fall() {
            top += fallSpeed; 
            rotation += spinSpeed; 
            horizontalPos += horizontalMovement / 10;

            element.style.top = `${top}px`;
            element.style.transform = `rotate(${rotation}deg)`;
            element.style.left = `${horizontalPos}%`;
            
            if (top > window.innerHeight * 0.7) {
                opacity -= 0.03;
                element.style.opacity = opacity;
            }

            if (top < window.innerHeight && opacity > 0) {
                requestAnimationFrame(fall);
            } else {

                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }
        }
        
        // Start animation
        requestAnimationFrame(fall);
    }
});
