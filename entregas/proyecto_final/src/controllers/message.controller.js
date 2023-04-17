import { getManagerMessages } from "../dao/daoManager.js";

// Exporting this instance of messageManager to the entire project
const managerData = await getManagerMessages()
export const messageManager = new managerData()