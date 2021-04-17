import { combineReducers } from 'redux';

const initialCartItems = [
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
];
let updatedItems = initialCartItems;

const itemReducer = (cartItems = initialCartItems, action) => {
    const {payload: {item, quantity} = {}} = action;

    switch(action.type) {
        case 'QUANTITY':
            for (let i=0; i<cartItems.length; i++) {
                if (item.id === cartItems[i].id) {
                    cartItems[i].qty = quantity;
                }
            }
            updatedItems = cartItems.filter(item => item);
            return updatedItems;

        case 'REMOVE':
            for (let i=0; i<cartItems.length; i++) {
                if (item.id === cartItems[i].id) {
                    cartItems.splice(i, 1);
                }
            }
            updatedItems = cartItems.filter(item => item);
            return updatedItems;

        default:
            return cartItems;
    }
}

const priceReducer = (cartPrices = {totalPrice: 0, finalPrice: 0, vatPrice: 0}, action) => {
    switch(action.type) {
        case 'UPDATE_TOTAL_PRICE':
            let _totalPrice = 0, _finalPrice = 0, _vatPrice = 0;
            for(let i=0; i<updatedItems.length; i++) {
                _totalPrice += updatedItems[i].price * updatedItems[i].qty;
            }
            _vatPrice = _totalPrice * 0.1;
            _finalPrice = _totalPrice * 1.1;
            return {
                totalPrice: _totalPrice.toFixed(2),
                vatPrice: _vatPrice.toFixed(2),
                finalPrice: _finalPrice.toFixed(2)
            }

        default:
            return cartPrices;
    }
}

const allReducers = combineReducers({
    cartItems: itemReducer,
    cartPrices: priceReducer
});

export default allReducers;