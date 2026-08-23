import orderModel from "../models/orderModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// placing user order for frontend
const placeOrder = async (req, res) => {

    const frontend_url = "https://food-delivery-1-frontend.onrender.com";

    try {

        console.log("USER ID:", req.userId);
        console.log("BODY:", req.body);

        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        console.log("Saving order...");

        await newOrder.save();

        console.log("Order saved:", newOrder._id);

        await userModel.findByIdAndUpdate(
            req.userId,
            { cartData: {} }
        );

        console.log("Cart cleared");

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",

                product_data: {
                    name: item.name
                },

                unit_amount: Math.round(Number(item.price) * 100)
            },

            quantity: Number(item.quantity)
        }));

        line_items.push({
            price_data: {
                currency: "usd",

                product_data: {
                    name: "Delivery Charges"
                },

                unit_amount: 200
            },

            quantity: 1
        });

        console.log("Stripe line items:", line_items);

        console.log(
            "Stripe key exists:",
            !!process.env.STRIPE_SECRET_KEY
        );

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",

            success_url:
                `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,

            cancel_url:
                `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        console.log("Stripe session created:", session.id);

        res.json({
            success: true,
            session_url: session.url
        });

    } catch (error) {

        console.log("================================");
        console.log("PLACE ORDER ERROR:");
        console.log(error);
        console.log("ERROR MESSAGE:", error.message);
        console.log("================================");

        res.json({
            success: false,
            message: error.message
        });
    }
};


 const verifyOrder = async(req,res) =>{
     const {orderId,success} = req.body;
     try {
        if(success=="true"){
             await orderModel.findByIdAndUpdate(orderId,{payment:true})
             res.json({success:true,message:"Paid"})
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
     }
     catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
     }
 }
 // user order for frontend
const userOrders = async (req, res) => {
    try {

        const userId = req.userId;

        const orders = await orderModel.find({
            userId: userId
        });

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// Listing Orders for admin panel
const listOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({});

        const ordersWithUser = await Promise.all(
            orders.map(async (order) => {

                const user = await userModel.findById(order.userId);

                return {
                    ...order.toObject(),

                    user: user
                        ? {
                            name: user.name,
                            email: user.email
                        }
                        : null
                };
            })
        );

        res.json({
            success: true,
            data: ordersWithUser
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Error"
        });
    }
};

// api for updating order 
const updateStatus = async(req,res) =>{
   try{
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
      res.json({success:true,message:"Status Updated"})
   }
   catch(error){
      console.log(error);
      res.json({success:false,message:"Error"})
   }
}


export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}
