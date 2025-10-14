export const getPriceQueryParams = (searchParams, key , value) => {
    const hasValueInParams = searchParams.get(key);

    if(value && hasValueInParams){
        searchParams.set(key, value);
    } else if (value) {
        searchParams.append(key, value);
    } else if (hasValueInParams) {
        searchParams.delete(key);
    }
    
    return searchParams;
}   


export const calculateOrderPrice = (cartItems) => {
    // Calculate Prices
    const itemsPriceTotal = cartItems.reduce((acc, item) =>
         acc + item.quantity * item.price, 0);
    const shippingCharges = itemsPriceTotal > 200 ? 0 : 25;
    const tax = +(itemsPriceTotal * 0.15).toFixed(2);
    const totalPrice = +(itemsPriceTotal + shippingCharges + tax).toFixed(2);

    return {
        itemsPriceTotal,
        shippingCharges,
        tax,
        totalPrice
    }
}

