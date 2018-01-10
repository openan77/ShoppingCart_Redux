export const toggle = () => {
    return{
        type : "TOGGLE"
    }
}

export const addToCart = (product) => {
    const newCart = this.state.cart;
    newCart.push(product);
    this.setState(
        { cart: newCart }
    );
}

export const checkout = (totalPrice) => {
    alert(`已扣除${totalPrice}元`)
}