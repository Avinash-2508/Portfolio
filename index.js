var typed = new Typed('#element', {
    strings: ["Web Developer", "Cyber Security Enthusiast", "Computer Science Student","Tech Enthusiast"],
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





