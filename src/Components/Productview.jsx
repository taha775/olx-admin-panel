import React,{useState,useEffect} from 'react'
import { db } from './Config/Firebase';
import { useParams,Link } from 'react-router-dom'
import './Productview.css'
import { ref, onValue } from 'firebase/database';

const ProductView = () => {

  const [product,setProduct] = useState({})
  const {id} = useParams()

  useEffect(()=>{
    const ProductRef = ref(db, `products/${id}`);

    const onDataChange = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setProduct(data);
      }
      else{
        setProduct({})
      }
    };
  
    const databaseListener = onValue(ProductRef, onDataChange);
  
    return () => {
      // Clean up the listener when the component unmounts
      databaseListener();
    };

  },[id])

console.log("product",product)






  return (
    <div style={{marginTop:"150px"}}>
      <div className='card'>
        <div className='card-header'>
          <p>PRODUCT DETAILS</p>
        </div>
        <br />
        <div className="container">
          <strong>ID</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>PRODUCT NAME </strong>
          <span>{product.productname}</span>
          <br />
          <br />
        
          <strong>PRODUCT PRICE</strong>
          <span>{product.price}</span>
          <br />
          <br />
          <strong>CONTACT</strong>
          <span>{product.productdate}</span>
          <br />
          <br />
          <strong>CONTACT</strong>
          <span>{product.productdescription}</span>
          <br />
          <br />
          <Link to={"/"} >
            <button className='btn btn-edit' >
                GO BACK 
            </button>
          </Link>
        
           
        </div>

      </div>

    </div>
  )
}

export default ProductView