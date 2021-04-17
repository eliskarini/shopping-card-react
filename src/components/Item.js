import React, {useState, useRef} from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import swal from 'sweetalert';

import { removeItem, updateQuantity, updatePrice} from '../actions';
import { useDispatch } from 'react-redux';

export default function Item({item, updateQty}) {
    const dispatch = useDispatch();

    let count = item.qty || 1;
    const countRef = useRef();

    function decrementCount() {
        if(count <= 1){
            return
        }
        count = count - 1;
        countRef.current.value = count;
        dispatch(updateQuantity(item, count));
        dispatch(updatePrice());
    }

    function incrementCount() {
        count = count + 1;
        countRef.current.value = count;
        dispatch(updateQuantity(item, count));
        dispatch(updatePrice());
    }

    function remove() {
        swal({
            title: "Attention",
            text: `Are you sure to remove ${item.name}?`,
            icon: "info",
            buttons: true,
        }).then((resp) => {
            if(resp) {
                swal({
                    title: `${item.name} has removed`,
                    icon: "success",
                })
                .then(() => {
                    dispatch(removeItem(item));
                    dispatch(updatePrice());
                })
            } else {
                return;
            }
        });
    }

    function moveToWishlist() {
        swal({
            title: `${item.name} has moved to wishlist!`,
            icon: "success",
        });
    }

    function onQtyChange() {
        dispatch(updateQuantity(item, countRef.current.value));
        dispatch(updatePrice());
    }

    return (
        <>
        <Row className="py-3 border-bottom">
            <Col xs={12} md={3}>
                <Card.Img src={item.image}/>
            </Col>
            <Col xs={12} md={6} className="d-flex flex-column">
                <Card.Title>{item.name}</Card.Title>
                <div className="my-auto">
                    <div>{item.type}</div>
                    <div>COLOR: {item.color}</div>
                    <div>SIZE: {item.size}</div>
                </div>
                <div className="mt-auto">
                    <button onClick={remove} className="btn bg-transparent pl-0"><MdDelete size='20px'/>Remove Item</button>
                    <button onClick={moveToWishlist} className="btn bg-transparent pl-0"><FaHeart size='18px'/> Move To Wishlist</button>
                </div>
            </Col>
            <Col xs={12} md={3} className="text-right d-flex flex-md-column">
                <div>
                    <button className="bg-transparent border" onClick={decrementCount}>-</button>
                    <input ref={countRef} className="border text-center" style={{width: "50px"}} defaultValue={count} onChange={onQtyChange} />
                    <button className="bg-transparent border" onClick={incrementCount}>+</button>
                </div>
                <div className="mt-auto ml-auto">
                    <strong>${item.price}</strong>
                </div>
            </Col>
        </Row>
        </>
    )
}
