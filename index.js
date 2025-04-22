var typed = new Typed('#element', {
    strings: ["Web Developer", "Cyber Security Enthusiast", "Student."],
    typeSpeed: 100,
    loop: true
});

function sendMail() {
    window.location.href = "mailto:avinash.ponneboina@gmail.com?subject=Inquiry&body=Hello,Thanks for coming Here You are are one step away. Let's connect!";
}

// document.querySelector(".Hamburger").addEventListener("click", ()=>{
//     document.querySelector(".sidebar")
// })

function showsidebar(){
    const sidebar = document.querySelector(".sidebar")
    sidebar.style.display = 'flex'
}
function closesidebar(){
    const sidebar = document.querySelector(".sidebar")
    sidebar.style.display = 'none'
}

  const form = document.forms["submit-to-google-sheet"];

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stops the form from refreshing the page

    const data = {
      name: document.getElementById("userName").value,
      email: document.getElementById("userEmail").value,
      message: document.getElementById("userMessage").value
    };

    fetch("https://script.google.com/macros/s/AKfycby6uF0Suxutt1O4pfteuuAKi6Sb-63hMLLWXKPsxwK7DcQvwQf-P6N95GTb_uSYMkmZrQ/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(response => {
      alert("Message sent successfully!");
      form.reset(); // Clears the form
    })
    .catch(error => {
      console.error("Error!", error.message);
    });
  });
