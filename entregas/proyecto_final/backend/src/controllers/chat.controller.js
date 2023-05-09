import { chatServer } from "../index.js"
import { createMessage, readMessages } from "../services/messageServices.js"

export const getMessages = async (req, res) => {
    try {
        const messages = await readMessages()
        console.log(messages)

        res.status(200).json({
            messages: messages
        })
    } catch (error) {
        res.status(500).send({
            message: `Internal server error`,
            error: error.message
        })

    }
}

export const sendMessage = async (req, res) => {
    const { message } = req.body
    const { first_name, last_name, email } = req.session.user

    try {
        await createMessage({
            name: `${first_name} ${last_name}`,
            email,
            message
        })
        const messages = await readMessages()
        chatServer.emit()

    } catch (error) {

    }
}