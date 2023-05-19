const socket = io()

const messageForm = document.getElementById("messageForm")
const messageSender = document.getElementById("senderName")
const messageEmail = document.getElementById("senderEmail")
const messageText = document.getElementById("senderText")
const sendButton = document.getElementById("sendButton")
const chatBox = document.getElementById("chatBox")

const SESSION_URL = 'http://localhost:8080/api/session/current'
let sessionName, sessionEmail, sessionRole

window.addEventListener("load", async () => {
    socket.emit("load messages")
    const response = await fetch(SESSION_URL)
    const sessionData = await response.json()

    console.log("[chatsessiondata] ", sessionData)

    if (sessionData.role === 'admin') {
        messageText.value = 'ADMIN CANNOT SEND MESSAGES'
        messageText.disabled = true
        sendButton.disabled = true
    }
    sessionName = `${sessionData.first_name} ${sessionData.last_name}`
    sessionEmail = sessionData.email

})

socket.on("allMessages", async message => {
    chatBox.textContent = ''
    message.forEach(message => {
        let date = new Date(message.date)
        const dateOpts = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        }
        chatBox.textContent += `[${new Intl.DateTimeFormat('es-AR', dateOpts).format(date)}] ${message.name} (${message.email}): ${message.message}\n`
    })
})

messageForm.addEventListener("submit", e => {
    e.preventDefault()

    //if (messageSender.value && messageEmail.value && messageText.value) {
    // const newMessage = {
    //     name: messageSender.value,
    //     email: messageEmail.value,
    //     message: messageText.value
    // }

    if (sessionData.role === "user") {

        const newMessage = {
            name: sessionData.name,
            email: sessionData.mail,
            message: messageText.value
        }
        socket.emit("message", newMessage)
        messageText.value = ''
        scrollDown()
    } else {
        alert(`El administrador no puede enviar mensajes al chat`)
    }
    // } else {
    //     alert("Complete todos los campos para enviar un mensaje")
    // }
})

function scrollDown() {
    chatBox.scrollTop = chatBox.scrollHeight
}