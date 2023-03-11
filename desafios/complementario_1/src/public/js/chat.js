const socket = io()

const messageForm = document.getElementById("messageForm")
const messageSender = document.getElementById("senderName")
const messageEmail = document.getElementById("senderEmail")
const messageText = document.getElementById("senderText")
const chatBox = document.getElementById("chatBox")

socket.on("allMessages", async message => {
    chatBox.textContent = ''
    message.forEach(message => {
        chatBox.textContent += `${message.name} (${message.email}): ${message.message}\n`

    })
    //chatBox.value += `${message}\n`
})

messageForm.addEventListener("submit", e => {
    e.preventDefault()

    if (messageSender.value && messageEmail.value && messageText.value) {
        const newMessage = {
            name: messageSender.value,
            email: messageEmail.value,
            message: messageText.value
        }
        socket.emit("message", newMessage)
        messageText.value = ''
    } else {
        alert("Complete todos los campos para enviar un mensaje")
    }
})