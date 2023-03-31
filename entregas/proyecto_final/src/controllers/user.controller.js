import { getManagerUsers } from "../dao/daoManager.js";

// Exporting this instance of userManager to the entire project
const managerData = await getManagerUsers()
export const userManager = new managerData()

export const createUser = async (req, res) => {
    res.redirect('/login', 200, { status: "success", message: "User created successfully" })
}
