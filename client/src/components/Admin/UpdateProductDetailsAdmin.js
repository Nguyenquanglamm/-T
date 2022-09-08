import axios from 'axios';
import React, { useEffect } from 'react';

const UpdateProductDetailsAdmin = () => {
    useEffect(() =>{
        axios.get(`/api/productdetailss/`)
    })
    return (
        <div>
            
        </div>
    );
};

export default UpdateProductDetailsAdmin;