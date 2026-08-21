import userModel from "../models/userModels.js";


// add items to user cart
const addToCart = async(req,res) =>{
  try{
      console.log("User ID:", req.body.userId);
      console.log("Item ID:", req.body.itemId);
    let userData= await userModel.findOne({_id:req.body.userId})
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId])
    {
        cartData[req.body.itemId] =1;
    }
    else {
        cartData[req.body.itemId] +=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Add To Cart"})
  }
  catch(error){
    res.json({success:false,message:"Error"})
  }
}
// remove items from user cart
const removeFromCart = async(req,res) =>{
   try{
    let userData = await userModel.findOne({_id:req.body.userId});
    let cartData = await userData.cartData;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -=1;
    } 
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Removed from cart"})
   }
   catch(error){
     console.log(error);
     res.json({success:"false",message:"Error"});
   }
}
// fetch user cart data
const  getCart = async(req,res) =>{
    try{
        let userdata = await userModel.findById({_id:req.body.userId});
        let cartData = await userdata.cartData;
        res.json({success:true,cartData});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addToCart,removeFromCart,getCart}