import React, { useEffect, useState } from 'react'
import { Navbar,Container,Nav,Badge} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchByproduct } from '../Redux/Slices/productSlice'

function Header({insideHome}) {
  const wishlist= useSelector(state=>state.wishlistReducer)
  const cart= useSelector(state=>state.cartReducer)
  const dispatch= useDispatch()

  return (
    <Navbar style={{zIndex:'1'}} expand="lg" className="bg-primary w-100 position-fixed">
    <Container>
      <Navbar.Brand><Link to={'/'} style={{textDecoration:'none',color:'white'}}>
      <i class="fa-solid fa-truck fa-fade 4x me-2"></i>
        Daily Cart</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
         {insideHome&&<Nav.Link>
           <input type="text" style={{color:'green', margin:"none", outline:'none'}} onChange={e=>dispatch(searchByproduct(e.target.value.toLowerCase()))} /> 
         </Nav.Link>}
          <Nav.Link ><Link to={'/wishlist'} style={{textDecoration:'none',color:'white'}}>
            <i className="fa-solid fa-heart text-danger"></i>
             <Badge className='bg-dark'>{wishlist?.length}</Badge></Link></Nav.Link>
          <Nav.Link href="#link"><Link to={'/cart'} style={{textDecoration:'none',color:'white'}}>
          <i className="fa-solid fa-cart-plus text-success"></i>
            Cart<Badge className='bg-dark'>{cart?.length}</Badge></Link></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header