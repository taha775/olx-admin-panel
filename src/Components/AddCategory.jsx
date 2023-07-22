import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from './Config/Firebase';
import { useParams, useNavigate } from 'react-router-dom';
import { onValue, push, ref, set, update } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  productname: '',
  productprice: '',
  productdate: new Date().toISOString().slice(0, 10), // Set the initial date to the current date (formatted as YYYY-MM-DD)
  productdescription: '',
  
productimage: null,
};

const AddCategory = () => {
  const [state, setState] = useState(initialState);
  const { productname, productdate, productdescription, productprice, productimage } = state;

  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const ProductRef = ref(db, 'products');

    const onDataChange = (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setData(data);
      }
    };

    const databaseListener = onValue(ProductRef, onDataChange);

    return () => {
      databaseListener();
    };
  }, []);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
  }, [id, data]);

  const handleSubmit = async (e) => {
    console.log("twfdgsfgdfg")
    e.preventDefault();
    if (!productname || !productprice || !productdescription) {
      toast.error('Please provide a value for each input field');
    } else {
      if (!id) {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10); // Format the date as YYYY-MM-DD
        const ProductRef = ref(db, `products`);

        setState((prevState) => ({
          ...prevState,
          productdate: formattedDate,
        }));

        try {
          // Upload the image to Firebase Storage (replace 'images' with your desired storage path)
          const storage = getStorage();   // USED THIS TO STORE IMAGE FILES
          const imageRef = storageRef(storage, `images/${productimage.name}`);
          console.log(imageRef)
          await uploadBytes(imageRef, productimage);

          // Get the download URL of the uploaded image
          const downloadURL = await getDownloadURL(imageRef);

          // Create a new product object with the download URL
          const newProduct = { ...state, productimage: downloadURL };

          // Push the new product data to the database
          push(ProductRef, newProduct, (error) => {
            if (error) {
              toast.error(error.message);
            } else {
             toast.error("data added succenfukky")
              
            }
          });
        } catch (error) {
          toast.error('Error uploading image: ' + error.message);
        }
      } else {
        // Handling updates is the same as before
        console.log("zhxchzxgcvzxcv")
        const ProductRef = ref(db, `products/${id}`);
        set(ProductRef,state,(error)=>{
          if(error){
            toast.error("error.message")

          }
          else{
            toast.success("data updated successfully")
          }
        })
        // ...
      }
    }

    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setState({ ...state, productimage: file });
    }
  };
  

  return (
    <>
      <div className='addcategory'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="productname">Product Name</label>
          <br />
          <input
            type="text"
            name="productname"
            value={productname}
            id="productname"
            onChange={handleInputChange}
            placeholder="Product Name"
          />
          <br />
          <label htmlFor="productprice">Product Price</label>
          <input
            className="input"
            type="number"
            name="productprice"
            value={productprice}
            id="productprice"
            onChange={handleInputChange}
            placeholder="Enter price"
          />
          <br />
          <label htmlFor="productdescription">Product Description</label>
          <input
            className="input"
            type="text"
            name="productdescription"
            value={productdescription}
            id="productdescription"
            onChange={handleInputChange}
            placeholder="Provide product description / details"
          />
          <br />
         
          <br />
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            accept="image/*"
            name="productimage"
            onChange={handleImageChange}
          />
          <br />
          <input className="submit" type="submit" value={id ? 'Update' : 'Save'} />
        </form>
      </div>
    </>
  );
};

export default AddCategory;
