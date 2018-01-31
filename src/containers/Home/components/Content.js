import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col, Jumbotron, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import AlbumJSON from './Album.json';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cartAction from '../../../actions/index';
import index from '../../../reducers/index';



const mapStateToProps = (state) => {
  console.log('STATE',state);
  return {
    addedIds: state.cartReducer.addedIds,
    cartProducts: state.cartReducer.all,
    modal: state.toogleReducer.modal
  }
}

const mapDispatchToProps = (dispatch) => ({
    addProduct: bindActionCreators(cartAction.addProduct, dispatch),
    removeProduct: bindActionCreators(cartAction.removeProduct, dispatch),
    toggle: bindActionCreators(cartAction.toggle, dispatch)
  })




//----------------------------------------------------------------------------

class Content extends Component {
  state = {
    user: 'temp',
    password: 'temp'
  }

  userChange = (e) => {
    this.setState({user: e.target.value});
  }

  passwordChange = (e) => {
    this.setState({password: e.target.value});
  }

  total = (products) => {
    let total = 0;
    if (this.props.addedIds.length === 0 ){
      return 0
    }
    else{
      for (let product in products){
        num = this.props.cartProducts[product].count;
        price = this.props.cartProducts[product].price;
        money = price*num;
        total += money;
      }
      return total
    }
  }


  checkout = (totalPrice) => {
    alert(`已扣除${totalPrice}元`);
  }

  render() {
    //console.log('PROPS',this.props);
    return (
      <Container>
        <Row>
          <Col md="12">
            <Jumbotron>
              <h1 className="display-3">植物工坊</h1>
              <p className="lead">用大自然元素及運行法則栽培農業的植物工坊 工坊座落於大屯山下擁有豐富大自然生態資源，供給工坊最天然的元素。</p>
              <p>太陽，空氣，風，水。。提供工坊種植的優質條件，工坊堅持以老天供給最自然條件生產農作物</p>
              <Form inline>
                <FormGroup>
                  <Label for="exampleEmail" hidden>Email</Label>
                  <Input type="username" placeholder="Username" onChange={this.userChange} />
                </FormGroup>
                &nbsp;
                <FormGroup>
                  <Label for="examplePassword" hidden>Password</Label>
                  <Input type="password" placeholder="Password" onChange={this.passwordChange}/>
                </FormGroup>
                &nbsp;
                <Button color="primary" onClick={()=>{console.log(this.state)}}>登入</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={()=>{
                    this.props.toggle(this.props.modal);
                  }
                  } color="primary">購物車({this.props.addedIds.length})</Button>
              </Form>
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
                    <Button onClick={() => {
                        this.props.addProduct(product);
                      }}>購買</Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button onClick={() => {
                        this.props.removeProduct(product);
                      }}>取消</Button>
                  </CardBody>
                </Card>
              </Col>
            )
          )
          }

        </Row>
        <Modal isOpen={this.props.modal} toggle={()=>{
                  this.props.toggle(this.props.modal);
                }}>
          <ModalHeader toggle={()=>{
                  this.props.toggle(this.props.modal);
                }}>購物車</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>品項</th>
                  <th>數量</th>
                  <th>價格</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.addedIds.map(index => (
                    <tr>
                      <th scope="row">{index}</th>
                      <td>{this.props.cartProducts[index].title}</td>
                      <td>{this.props.cartProducts[index].count}</td>
                      <td>{this.props.cartProducts[index].price}</td>
                    </tr>
                  )
                )
                }

              </tbody>
            </Table>
            <p>總價:{this.total(this.props.cartProducts)}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={this.props.addedIds.length === 0} onClick={() => {
              this.checkout(this.total(this.props.cartProducts));
             } }>結帳</Button>{' '}
            <Button color="secondary" onClick={()=>{
                  this.props.toggle(this.props.modal);
                }}>取消</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);

