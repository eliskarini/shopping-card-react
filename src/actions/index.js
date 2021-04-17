export const updateQuantity = (item, newQuantity) => {
    return {
        type: 'QUANTITY',
        payload: {
            item,
            quantity: newQuantity
        }
    };
};

export const removeItem = (item) => {
    return {
        type: 'REMOVE',
        payload: {
            item
        }
    };
};

export const updatePrice = () => {
    return {
        type: 'UPDATE_TOTAL_PRICE',
    };
};