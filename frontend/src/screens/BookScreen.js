import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import booksData from '../data/books'; 


const BookScreen = ({ match }) => {

    const [book, setBook] = useState({})
    
    useEffect(() => {

        setBook(booksData[match.params.id])

    }, [match])

    return (
        <>
            <Link className='btn btn-light my-3' to='/'> 
                Regresar...
            </Link>        
            <Row>
                <Col md={4}>
                    <Image src={book.image} alt={book.name} fluid />
                </Col>

                <Col md = {4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item><h3>{book.name}</h3></ListGroup.Item>
                        <ListGroup.Item>Autor: {book.author}</ListGroup.Item>
                        <ListGroup.Item variant='flush'>Descripción: {book.description}</ListGroup.Item>
                    </ListGroup>  
                </Col>   
                <Col md = {3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            Estado: {book.countInStock > 0 ? 'Disponible' :'No Disponible'} ({book.countInStock}) uds
                        </ListGroup.Item>
                        <ListGroup.Item><strong>Precio:</strong> {book.price}</ListGroup.Item>
                    </ListGroup>  
                </Col>                 

            </Row>     
        </>
    )
}

export default BookScreen