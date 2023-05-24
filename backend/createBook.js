import dotenv from 'dotenv'
import Books from './models/bookModel.js'
import connectDB from './config/db.js'
import books from './data/books.js' 
import AWS from 'aws-sdk';

dotenv.config()

connectDB()

const importData = async () => {
    if (process.env.DB_PROVIDER === 'MongoDB') {
        const sampleBooks = books.map(book => {
            return { ...book }
        })

        try {
            await Books.deleteMany()

            await Books.insertMany(sampleBooks)
            console.log('Elementos cargados correctamente a Mongo'.green.bold)
        } catch (error) {
            console.error(`${error}`.red.inverse)
        }
    } else if (process.env.DB_PROVIDER = 'DynamoDB') {
        try {
            const docClient = new AWS.DynamoDB();
            const booksWithNewField = books.map(book => ({
                ...book,
                _id: book.name
            }));

            const params = {
                RequestItems: {
                    'libro': booksWithNewField.map(item => ({
                        PutRequest: {
                            Item: AWS.DynamoDB.Converter.marshall(item)
                        }
                    }))
                }
            };
            docClient.batchWriteItem(params, (err, data) => {
                if (err) {
                    console.error('Error al cargar los datos a Dynamo:', err);
                } else {
                    console.log('Elementos cargados correctamente a DynamoDB');
                }
            });
        } catch (error) {
            console.error(`${error}`.red.inverse)
        }
    } else {
        console.log('Proveedor DB Desconocido'.green.bold)
        process.exit()
    }
}
export { importData }