const selectedDB = process.env.DBSELECTION

export const getManagerMsg = async () => {
    const modelMsg = selectedDB === 1
        ? await import('./MongoDB/models/Message.js') // MongoDB 
        : await import('./Postgresql/models/Message.js') // SQL (postgres)
    return modelMsg
}

export const getManagerProd = async () => {
    const modelProd = selectedDB === 1
        ? await import('./MongoDB/models/Product.js') // MongoDB 
        : await import('./Postgresql/models/Product.js') // SQL (postgres)
    return modelProd
}

export const getManagerCart = async () => {
    const modelCart = selectedDB === 1
        ? await import('./MongoDB/models/Cart.js') // MongoDB 
        : await import('./Postgresql/models/Cart.js') // SQL (postgres)
    return modelCart
}