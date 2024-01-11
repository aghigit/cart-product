import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromwishlist } from './wishlistSlice';
import { addToCart } from '../Redux/Slices/cartSlice';
import Header from '../components/Header';


function Wishlist() {
  // get wishlist from store
  const wishlist =useSelector(state=>state.wishlistReducer)
  const dispatch=useDispatch()
  // console.log(wishlist)

  const handleRemoveWishlist =(product)=>{
    dispatch(removeFromwishlist(product?.id))
    dispatch(addToCart(product))
  }


  return (
    <>
    <Header/>
      <div style={{paddingTop:'100px'}}>
        <div className="container">
          <Row className="mt-5">
                {
                  wishlist?.length>0?wishlist?.map((product,index)=>(
                    <Col key={index} style={{marginBottom:'10px'}} sm={12} md={6} lg={4} xl={3} >
                      <Card className='card-shadow' style={{ width: '18rem' }}>
                        <Card.Img height={'180px'}  variant="top" src={product?.thumbnail} />
                        <Card.Body>
                          <Card.Title>{product.title.slice(0)}</Card.Title>
                          <div  className='d-flex justify-content-between'>
                            <button onClick={()=>dispatch(removeFromwishlist(product?.id))} className='btn btn-link'>
                              <i className='fa-solid fa-heart-circle-minus  text-danger'></i>
                            </button>
                            <button onClick={()=>handleRemoveWishlist(product)} className='btn btn-link'>
                              <i className='fa-solid fa-cart-plus text-success'></i>
                            </button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
  
     )) :
                <h1>nothing in wishlist</h1>
  }
          </Row>
        </div>
      </div>
    </>
  )
}

export default Wishlist