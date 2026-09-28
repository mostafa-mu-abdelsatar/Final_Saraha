import cors from 'cors'
import DBConnection from './DB/DB.connection.js'
import authController from './modules/auth/auth.controller.js'

const bootstrap = async (app, express)=>{
    app.use(cors(), express.json())
    DBConnection()
    app.use("/auth",authController)
    // app.use("/user",userController)
}

export default  bootstrap