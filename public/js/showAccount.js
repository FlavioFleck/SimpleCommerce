const token = document.cookie
const accountIcon = document.getElementById("account-container")
const links = document.querySelector(".links-container")

if(token) {
    console.log("logado")
    accountIcon.style.display = "block"
    links.style.display = "none"
}