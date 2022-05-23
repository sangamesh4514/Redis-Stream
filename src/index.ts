import 'dotenv/config'
import app from './app'
import {init} from './redis'
 
(async function(){
    try {
        await init()
        app.listen(process.env.PORT, ()=> console.log('server running on port ',process.env.PORT))
        } catch (error) {
          console.log("redis error",error);
        }      
})()
