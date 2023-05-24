import * as e from 'cors'
import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'
import AWS from 'aws-sdk';


const getBooksById = asyncHandler(async(req, res) => {
    if (process.env.DB_PROVIDER === 'MongoDB') {
        const book = await Book.findById(req.params.id)
        if (book) {
            res.json(book)
        } else {
            res.status(404).json({ message: 'Book Not Found' })
        }
    } else {
        const jsonConfig = JSON.parse(process.env.DB_CONNECTION);
        AWS.config.update(jsonConfig);
        const docClient = new AWS.DynamoDB();
        const params = {
            TableName: 'book',
            Key: AWS.DynamoDB.Converter.marshall({
                name: req.params.id
            })
        };

        docClient.getItem(params, (err, data) => {
            if (err) {
                console.error('Error:', err);
            } else {
                res.json(AWS.DynamoDB.Converter.unmarshall(data.Item))
            }
        });
    }
})

const getBooks = asyncHandler(async(req, res) => {
    if (process.env.DB_PROVIDER === 'MongoDB') {
        const books = await Book.find({})
        console.log(books)
        res.json(books)
    } else {
        const jsonConfig = JSON.parse(process.env.DB_CONNECTION);
        AWS.config.update(jsonConfig);
        const docClient = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: 'book'
        };

        docClient.scan(params, function (err, data) {

            if (err) {
                console.log(err)
                res.send({
                    success: false,
                    message: err
                });
            } else {
                res.json(data.Items)
            }
        });
    }
})

export { getBooksById, getBooks }