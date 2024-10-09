import express from "express";
const Router = express.Router();
import productSchema from "../models/productsModel.js"

Router.get('/', (req, res)=>{
    res.send("hlw this is a productRouter")
});
Router.post('/create', async(req,res)=>{
   const {productname,description,category,brand,price,discountPrice, sizes,color,stock,images} = req.body
   const product = await productSchema.create({
    productname,
    description,
    category,
    brand,
    price,
    discountPrice,
    sizes,
    color,
    stock,
    images
    })
    console.log(product)
    res.send(product)
 });

Router.put("/update/:id", async (req, res)=>{
    const {productname,description,category,brand,price,discountPrice,sizes,color,stock,images} = req.body;
  const updatedProducts = await productSchema.findOneAndUpdate({_id: req.params.id},{
    productname,
    description,
    category,
    brand,
    price,
    discountPrice,
    sizes,
    color,
    stock,
    images
   },
   { new: true }
)
   console.log(updatedProducts);
   
    res.send(updatedProducts)
})

Router.get('/:id',async(req,res)=>{
   const products = await productSchema.findOne({_id :req.params.id})
   console.log(products);
   
    res.send(products)
})

Router.delete("/deleteProducts/:id",async(req,res) =>{
    const deleteProducts = await productSchema.findOneAndDelete({_id : req.params.id})
    console.log(deleteProducts);
    res.send(deleteProducts)
    
})

 export default Router ;