import React, {useState, useEffect} from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import Item from '../components/Item';
import {MdExpandMore} from 'react-icons/md';

import { updatePrice } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

export default function Home() {
    const cartItems = useSelector(state => state.cartItems);
    const { totalPrice, vatPrice, finalPrice } = useSelector(state => state.cartPrices);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updatePrice());
    }, []);

    function checkout() {
        swal({
            title: `Your total price is $${finalPrice}`,
            text: `Do you want to checkout?`,
            icon: "info",
            buttons: true,
        }).then((resp) => {
            if(resp) {
                swal({
                    title: "Thank you for shopping!",
                    icon: "success",
                })
            } else {
                return;
            }
        });
    }

    return (
        <>
        <Container>
            <div className="text-center m-5">
                <h2><strong>Shopping Cart</strong></h2>
            </div>
                <Row>
                    <Col xs={12} md={8}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>Cart ({cartItems.length} Items)</Card.Title>
                                {cartItems.map(item => 
                                    <Item key={item.id} item={item}/>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={4}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>The total amount of</Card.Title>
                                <Row>
                                    <Col xs={8} md={8}>
                                        Temporary amount
                                    </Col>
                                    <Col xs={4} md={4} className="text-right">
                                        ${totalPrice}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={8} md={8}>
                                        Tax
                                    </Col>
                                    <Col xs={4} md={4} className="text-right">
                                        {vatPrice}
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col xs={8} md={8}>
                                        <strong>Total amount of (including VAT 10%)</strong>
                                    </Col>
                                    <Col xs={4} md={4} className="text-right">
                                        <strong>${finalPrice}</strong>
                                    </Col>
                                </Row>
                                <div className="text-center pt-3">
                                    <Button variant="primary" className="w-100" onClick={checkout}>Go To Checkout</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="mt-2 shadow">
                            <Card.Body>
                                <Row>
                                    <Col xs={8} md={8}>
                                        Add a discount code (optional)
                                    </Col>
                                    <Col xs={4} md={4} className="text-right">
                                        <MdExpandMore />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </Container>
        </>
    )
}
