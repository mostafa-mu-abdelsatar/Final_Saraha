import cors from 'cors'
import DBConnection from './DB/DB.connection.js'
import authController from './modules/auth/auth.controller.js'
import messageController from './modules/message/message.controller.js'

const bootstrap = async (app, express)=>{
    app.use(cors(), express.json())
    DBConnection()
    app.use("/auth",authController)
    app.use("/message",messageController)
    // app.use("/user",userController)
}

export default  bootstrap