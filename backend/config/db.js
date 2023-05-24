import mongoose from 'mongoose';
import AWS from 'aws-sdk';

const connectDB = async() =>{

    try {
        if (process.env.DB_PROVIDER === 'MongoDB') {
            const conn = await mongoose.connect(process.env.DB_CONNECTION, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            })
        } else if (process.env.DB_PROVIDER === 'DynamoDB') {
            const jsonConfig = JSON.parse(process.env.DB_CONNECTION);
            AWS.config.update(jsonConfig);
        } else {
            console.log("Proveedor DB Desconocido")
            process.exit(1)
        }
    }catch(error){
        console.log(`Error al configurar la conexión con la DB: ${error.message}`.red.bold)
        process.exit(1)
    }
}

export default connectDB