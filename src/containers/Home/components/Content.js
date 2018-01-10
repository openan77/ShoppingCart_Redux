import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col, Jumbotron, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import AlbumJSON from './Album.json';
import {createStore} from 'redux';



// Reducer

const reducer = (state = [], action) => {
  switch (action.type) {
    case "PUSH":
      return [...state,
        action.product
      ]
    default:
      return state;
  }
};

// Store
const store = createStore(reducer, {});

// UI
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({type: "PUSH", product:{id:2,name:"banaba",price:"20"} });

//----------------------------------------------------------------------------

export default class Content extends Component {

  state = {
   modal: false,
   cart: [],
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  addToCart = (product) => {
    const newCart = this.state.cart;
    newCart.push(product);
    this.setState(
      {cart: newCart}
    );
  }

  checkout = (totalPrice) => {
    alert(`已扣除${totalPrice}元`);
  }

  render() {
    const TotalPrice = this.state.cart.reduce((acc, item) => acc + item.price, 0);
    return (
      <Container>
        <Row>
          <Col md="12">
            <Jumbotron>
              <h1 className="display-3">植物工坊</h1>
              <p className="lead">用大自然元素及運行法則栽培農業的植物工坊 工坊座落於大屯山下擁有豐富大自然生態資源，供給工坊最天然的元素。</p>
              <p>太陽，空氣，風，水。。提供工坊種植的優質條件，工坊堅持以老天供給最自然條件生產農作物</p>
              <p className="lead">
                <Button onClick={this.toggle} color="primary">購物車({this.state.cart.length})</Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          {
            AlbumJSON.map(product => (
              <Col xs="12" md="4">
                <Card>
                  <CardImg top width="100%" src={product.img} alt="Card image cap" />
                  <CardBody>
                    <CardTitle>{product.title}</CardTitle>
                    <CardSubtitle>價格:{product.price}</CardSubtitle>
                    <CardText>{product.desc}</CardText>
                    <Button disabled={this.state.cart.find(item => item.id === product.id)} onClick={() => this.addToCart(product)}>購買</Button>
                  </CardBody>
                </Card>
              </Col>
            )
          )
          }

        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>購物車</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>品項</th>
                  <th>價格</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.cart.map(item => (
                    <tr>
                      <th scope="row">{item.id}</th>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                    </tr>
                  )
                )
                }

              </tbody>
            </Table>
            <p>總價:{TotalPrice}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={this.state.cart.length === 0} onClick={() => this.checkout(TotalPrice)}>結帳</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>取消</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
