import React, {useState} from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import Item from '../components/Item';
import {MdExpandMore, MdClose} from 'react-icons/md';
import Modal from 'react-modal';

export default function Home() {
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "420px",
        },
      };
    
    const [items, setItems] = useState([
        {
            id: '001',
            name: 'Blue Denim Shirt',
            type: 'SHIRT BLUE',
            color: 'BLUE',
            size: 'M',
            image: `${process.env.PUBLIC_URL}/assets/images/denim-shirt-blue.jpg`,
            price: '17.99',
            qty: 1
        },
        {
            id: '002',
            name: 'Red Hoodie',
            type: 'HOODIE RED',
            color: 'RED',
            size: 'M',
            image: `${process.env.PUBLIC_URL}/assets/images/hoodie-red.jpg`,
            price: '35.99',
            qty: 1
        }
    ]);

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function updateQty(item, newQty) {
        for (let i=0; i<items.length; i++) {
            if (item.id === items[i].id) {
                items[i].qty = newQty;
            }
        }
        const newItems = items.filter(item => item);
        setItems(newItems);
        calculateTotal();
    }

    const [tempTotal, setTempTotal] = useState(0);
    const [total, setTotal] = useState(0);

    function calculateTotal() {
        let _tempTotal = 0;
        for(let i=0; i<items.length; i++) {
            _tempTotal += items[i].price * items[i].qty;
        }
        _tempTotal = _tempTotal.toFixed(2);
        setTempTotal(_tempTotal);
    }

    function removeItem(id) {
        for(let i=0; i<items.length; i++) {
            if(id === items[i].id) {
                items.splice(i, 1);
                const newItems = items.filter(item => item);
                setItems(newItems);
            }
        }
        calculateTotal();
      }
    return (
        <>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        >
            <div className="modalHeader text-right">
                <button className="border-none" style={{background: 'transparent', border: 'none'}} onClick={closeModal}>
                    <MdClose size='22px'/>
                </button>
            </div>
            <div>
                <div className="text-center"><h3>Your Item(s):</h3></div>
                <div>{items.qty} {items.name}</div>
                <div></div>
            </div>
        </Modal>
        <Container>
            <div className="text-center m-5">
                <h2><strong>Shopping Cart</strong></h2>
            </div>
                <Row>
                    <Col md={8}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>Cart ({items.length} Items)</Card.Title>
                                {items.map(item => 
                                    <Item key={item.id} item={item} updateQty={updateQty} removeItem={removeItem}/>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="shadow">
                            <Card.Body>
                                <Card.Title>The total amount of</Card.Title>
                                <Row>
                                    <Col md={8}>
                                        Temporary amount
                                    </Col>
                                    <Col md={4} className="text-right">
                                        ${tempTotal}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8}>
                                        Shopping
                                    </Col>
                                    <Col md={4} className="text-right">
                                        Gratis
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col md={8}>
                                        <strong>Total amount of (including VAT)</strong>
                                    </Col>
                                    <Col md={4} className="text-right">
                                        <strong>${tempTotal}</strong>
                                    </Col>
                                </Row>
                                <div className="text-center pt-3">
                                    <Button variant="primary" className="w-100" onClick={openModal}>Go To Checkout</Button>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card className="mt-2 shadow">
                            <Card.Body>
                                <Row>
                                    <Col md={8}>
                                        Add a discount code (optional)
                                    </Col>
                                    <Col md={4} className="text-right">
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
