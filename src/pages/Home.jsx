import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, navigateToNextPge, navigateToPrevPge } from '../Redux/Slices/productSlice'
import { Row,Col ,Spinner } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { all } from 'axios'
import { Link } from 'react-router-dom';
import Header from '../components/Header';


function Home() {
  const dispatch= useDispatch()
  const {allProducts,loading,error,productsPerPage, currentPage}=useSelector(state=>state.productReducer)
  const totalPages= Math.ceil(allProducts?.length/productsPerPage)
  const lastProductIndex=currentPage * productsPerPage
  const firstProductIndex=lastProductIndex - productsPerPage
  const visibleProductCards= allProducts?.slice(firstProductIndex,lastProductIndex)

  useEffect(()=>{
    dispatch(fetchProducts())
  },[])

  const handlePrevPage= ()=>{
    if(currentPage!=1){
      dispatch(navigateToPrevPge())
    }
  }
  
  const handleNextPage= ()=>{
    if(currentPage!= totalPages){
      dispatch(navigateToNextPge())
    }
  }


  return (

<> 
<Header insideHome/>
      <div style={{paddingTop:'100px'}}>
        {
          loading? <div className='mt-5 text-center'> 
            <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>loading...
          </div>:
          <Row className='m-5'>
            {
              allProducts?.length>0?visibleProductCards.map((product,index)=>(
                <Col key={index} className='mb-5' sm={12} md={6} lg={4} xl={3}>
                      <Card style={{ width: '18rem' }}>
                    <Card.Img style={{height:'150px'}} variant="top" src={product?.thumbnail} />
                    <Card.Body>
                      <Card.Title>{product?.title.slice(0,20)}...</Card.Title>
                      <div className='text-center'>
                        <Link to={`/view/${product?.id}`} className="btn btn-link"> View more</Link>
                        </div>
                    </Card.Body>
                  </Card>
                </Col>
              )): <div className='fw-bolder text-danger text-center'> product not found</div>
            }
          </Row>
        }
        <div className='d-flex justify-content-center align-items-center mt-5'>
          <button onClick={handlePrevPage} className='btn btn-outline-success'> <i className='fa-solid fa-backward'></i> </button>
          <span className='fw-bolder ms-4 me-4 '>{currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} className='btn btn-outline-success'> <i className='fa-solid fa-forward'></i> </button>
        </div>
      </div>
  
</>
  )
}

export default Home