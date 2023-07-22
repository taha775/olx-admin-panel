import React from "react";
import { Link } from "react-router-dom";
import img from "../ui/lox-logo.jpg"

const  Header =()=>{
  return(
    <div className="header fixed flex" >
      <div className="logo">
     
     <img src={img} alt="" />
      </div>
      
    <div className="location rel flex aic">
        <div className="icon-search ico"/>
        <input className="label s15 font " type="text" placeholder="Your Location "  value="Pakistan"  />
        <button className="icon-chevron-down arro" />
    </div>

    <div className="search flex aic" >
      <input type="text"  placeholder="Find cars MobilePhones and more......  " className="query font s15"/>
      <button className="icon-search go" />

    </div>

      <div className="action flex aic ">
        <Link to="/account/signin" className="fontb s1">sign in</Link>
      <button className="sell ">
      <div className="icon-plus">
        <h2 className="s15 font ">Sell   </h2>
      </div>
      </button>

      </div>
    </div>
  )
}

export default Header