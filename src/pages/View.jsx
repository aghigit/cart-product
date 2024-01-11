import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addtoWishlist } from './wishlistSlice'
import { addToCart } from '../Redux/Slices/cartSlice'
import Header from '../components/Header'

function View() {
const {id}= useParams()
console.log(id)
const [product,setProduct]= useState({})
const wishlist= useSelector(state=>state.wishlistReducer)
const dispatch =useDispatch()

useEffect(()=>{
  const allProducts = JSON.parse(sessionStorage.getItem('allProducts'))
  setProduct(allProducts?.find(item=>item.id==id))
},[])
console.log(wishlist)

const handleWishlist = (product)=>{
  const existingproduct = wishlist?.find(item=>item.id==product.id)
  if(existingproduct){
    alert('already in wishlist')
  }else{
    dispatch(addtoWishlist(product))
  }
}


  return (
    <>
    <Header/>
      <div style={{paddingTop:'100px'}}>
  
  <div className="container w-100 mt-5 shadow-lg pt-5">
  <Row>
          <Col className='col-lg-6'>
          <img src={product?.thumbnail} style={{height:'85%'}} alt="" />
          </Col>
          <Col className='col-lg-6'>
          <h3>{product?.brand}</h3>
          <p>{product?.description}</p>
          <h2>price: {product?.price}</h2>
          <div className='d-flex justify-content-around mt-5'>
            <button onClick={()=>handleWishlist(product)} className='btn btn-outline-dark'>
              <i className='fa-solid fa-heart text-danger'></i>
              add to wishlist</button>
            <button onClick={()=>dispatch(addToCart(product))} className='btn btn-outline-dark'>
            <i className='fa-solid fa-cart-plus text-success'></i>
              addto cart</button>
          </div>
          </Col>
        </Row>
  
  </div>
  
      </div>
    </>
  )
}

export default View