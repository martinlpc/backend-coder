import { Router } from "express"
import { checkRole, isSessionActive } from "../middlewares/session.js"
import { getMessages, sendMessage } from "../controllers/chat.controller.js"

export const routerChat = Router()

routerChat.get('/', isSessionActive, getMessages)
routerChat.post('/', checkRole("user"), sendMessage)