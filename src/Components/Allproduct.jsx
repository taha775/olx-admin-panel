import { onValue, ref,remove } from 'firebase/database'
import React, { useEffect,useState } from 'react'
import { db } from './Config/Firebase'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import './Allproduct.css'

const Allproduct = () => {
    const [data, setData] = useState({})



    useEffect(()=>{
        const ProductRef = ref(db,'products')

        const onDataChange =(snapshot)=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                setData(data)   // here seeing data in in useState data cominng from firebase 

            }


        }

        const databaseListener = onValue(ProductRef,onDataChange)

        return() =>{
            databaseListener()
        }
    },[])



    const onDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
          const ProductRef = ref(db, `products/${id}`);
      
          remove(ProductRef, (err) => {
            if (err) {
              toast.error(err.message);
            } else {
              toast.success('Contact deleted successfully');
            }
          });
        }
      };
      

  return (
  <>
   <div className='mainproduct' style={{margin:"100px"}}>
    <table className='styled-table'>
    <thead>
      <tr>
        <th style={{textAlign:"center"}}>No</th>
        <th style={{textAlign:"center"}}>Product Name</th>
        <th style={{textAlign:"center"}}>Product price </th>
        <th style={{textAlign:"center"}}>product description</th>
        <th style={{textAlign:"center"}}>product image </th>
      </tr>
    </thead>
    <tbody>
    {Object.keys(data).map((id,index)=>{
      // console.log(id)
      // console.log(index)
      return(
      
        <tr key={id}>
          <th scope='row' >{index + 1}</th>
          <td>{data[id].productname}   <h1></h1></td>
          <td>{data[id].productprice}</td>
          <td>{data[id].productdescription}</td>
          <td>{data[id].productdate}</td>
          <td><img width={60+"px"} src={data[id].productimage} alt="" /></td>
          <td>
            <Link to={`/update/${id}`}>
            <button className='btn btn-edit'>edit</button>
            
            </Link>
            <button className='btn btn-delete' onClick={()=>onDelete(id)}>delete</button>
            <Link to={`/productview/${id}`}>
            <button className='btn btn-view'>view</button>
            </Link>
          </td>
        </tr>
      
      
      )
      
    })

      
    }

    </tbody>



    </table>
   


   </div>

  
  </>
  )
}

export default Allproduct