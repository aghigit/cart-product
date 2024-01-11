import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts= createAsyncThunk('products/fetchProducts', async()=>{
    const response =await axios.get("https://dummyjson.com/products")
    sessionStorage.setItem('allProducts',JSON.stringify(response.data.products))
    return response.data.products
})

const productSlice= createSlice({
    name:'products',
    initialState:{
        allProducts:[],
        allProductsDummy:[],
        loading:false,
        error:'',
        productsPerPage:10,
        currentPage:1
    },
    reducers:{
        searchByproduct:(state,action)=>{
            state.allProducts = state.allProductsDummy.filter(item=>item.title.toLowerCase().includes(
                action.payload
            ))
        },
        navigateToNextPge:(state)=>{
            state.currentPage++
        },
        navigateToPrevPge:(state)=>{
            state.currentPage--
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading= true
        }),
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false
            state.allProducts=action.payload
            state.allProductsDummy=action.payload
        })
        builder.addCase(fetchProducts.rejected,(state)=>{
            state.loading=false
            state.allProducts=[]
            state.error='Api call failed...please try after some time..'
        })
    }
})

export const{navigateToNextPge,navigateToPrevPge}= productSlice.actions
export const {searchByproduct}= productSlice.actions
export default productSlice.reducer