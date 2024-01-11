import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decQuantity, emptyCart, incQuantity, removeCartItem } from '../Redux/Slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'



function Cart() {
  const cart= useSelector(state=>state.cartReducer)
  const dispatch=useDispatch()
  const navigate= useNavigate()


  const [totalCartAmount, setTotalCartamount]= useState(0)
  useEffect(()=>{
    if(cart?.length>0){
      setTotalCartamount(cart?.map(item=>item.totalPrice)?.reduce((p1,p2)=>p1+p2))
    }else{
      setTotalCartamount(0) 
    }
  
  },[cart])

  const handleCheckout=()=>{
    alert('order placed successfully.....')
    dispatch(emptyCart())
    navigate('/')
}

const handleDecrement= (product)=>{
  if(product.quantity==1){
    dispatch(removeCartItem(product.id))
  }else{
    dispatch(decQuantity(product))
}
}

  return (
   <>
   <Header/>
      <div style={{paddingTop:'100px'}}>
        <h1 className='text-center'>cart summary</h1>
        { cart?.length>0?
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <table className='table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>product</th>
                    <th>image</th>
                    <th>quantity</th>
                    <th>price</th>
                    <th>remove</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    cart?.map((product,index)=>(
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{product?.title}</td>
                        <td>
                          <img width={'60px'} height={'60px'} src={product?.thumbnail} alt="" />
                        </td>
                        <td>
                          <div className='d-flex align-items-center'>
                          <span onClick={()=> handleDecrement(product)} style={{cursor:'pointer'}} className='fw-bolder'>-</span>
                          <input style={{width:'50px'}} type="text" className='form-control ms-5' value={product?.quantity} readOnly />
                          <span onClick={()=>dispatch(incQuantity(product))} style={{cursor:'pointer'}} className='fw-bolder'>+</span>
                          </div>
                        </td>
                        <td>${product?.totalPrice}</td>
                        <td><button className='btn btn-link' onClick={()=>dispatch( removeCartItem(product?.id))}>
                          <i className='fa-solid fa-trash text-danger'></i>
                          </button></td>
                      </tr>
                    )
                    )
                  }
                </tbody>
              </table>
              <div className="float-end mt-5">
                <button onClick={()=>dispatch(emptyCart())} className='btn btn-danger'>empty cart</button>
                <Link to={'/'} className='btn btn-success'>shop more</Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="shadow border rounded p-4">
                <h5>total products:<span className='fw-bolder text-danger'> {cart.length}</span></h5>
                <h4>total amount:{totalCartAmount}</h4>
                <hr />
                <div className='d-grid mt-4'>
                  <button onClick={handleCheckout} className='btn btn-success'>checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>:
        <h1>your cart is empty</h1>
    }
      </div>
   </>
  )
}

export default Cart