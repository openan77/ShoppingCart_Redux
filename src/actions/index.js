//Action
export function addProduct(product) {
    return { 
        type: 'PUSH',
        product
    };
  }

  export function removeProduct(product) {
    return { 
        type: 'REMOVE',
        product
    };
  }

  export function toggle(modal) {
    return { 
        type: 'TOGGLE',
        modal
    };
  }