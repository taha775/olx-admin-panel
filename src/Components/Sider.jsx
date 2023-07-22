import React, { useEffect, useState } from 'react'
import './Sider.css'
import { Link, Routes, useLocation } from 'react-router-dom'
import AddCategory from './AddCategory'
import Allproduct from './Allproduct'
import { Route } from 'react-router-dom'
import ProductView from './Productview'


const Sider = () => {
    const [activeTab,setActiveTab] = useState("allproducts")
    const location = useLocation()

    useEffect(()=>{
        if(location.pathname ==="/"){
            setActiveTab("/")
        }
        else if(location.pathname ==="/add_category"){
            setActiveTab("add_category")
        }
        else if(location.pathname ==="/productview"){
            setActiveTab("productview")
        }
    },[location])

  return (
    <>
    <div className="main">
     
        <div className="right">
            <h2 className='fantasy'>Admin Dashboard</h2>
            <ul>
                <li><Link  style={{textDecoration:"none"}} to="/" > <p className={`${activeTab==="/" ? "active" :""}`} onClick={()=>setActiveTab("/")}  >Home</p></Link></li>
              
                <li> <Link style={{textDecoration:"none"}} to="add_category"> <p className={`${activeTab ==="add_category" ? "active" :""} `} onClick={()=>setActiveTab("add_category")} >ADD CATEGORY</p></Link></li>
              
                <li> <Link style={{textDecoration:"none"}} to="productview"> <p className={`${activeTab ==="productview" ? "active" :""} `} onClick={()=>setActiveTab("productview")} >view product</p></Link></li>
              
              
            </ul>

            <div className="right2">
                <ul><li>home</li></ul>
                <ul><li>about</li></ul>
                <ul><li>services</li></ul>
            </div>

        </div>

        <div className="left">
            
       
 
        </div>

    </div>


    </>
  )
}

export default  Sider