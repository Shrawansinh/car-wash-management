// controller ma model import karvu pade , controller ne datavse sate bat karna hai simple 
import Service from "../models/Service.js";
export const getAllServices = async (req,res)=>{
    try{
        const services = await Service.find(); // it work like select * from <Service></Service>
        res.status(200).json({ // frontend ne mokle response
            success: true,
            count: services.length, // serivce 5 hoy to count 5 aave object ma 
            data: services,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
// 500 means internal server error
export const getServiceById = async (req,res)=>{
    try{
        const service = await Service.findById(req.params.id); // 
        if(!service){
            return res.status(404).json({
                success:false,
                message:"Service not found",
            });
        }
        res.status(200).json({
            success:true,
            data:service,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
// create service
export const createService = async (req,res)=>{
    try{
        const service = await Service.create(req.body); // froneend mathi data lave
        res.status(201).json({
            success:true,
            data:service, // response ma means service varivak
        });
//         simple ma aavu ja aave 
//         {
//   "_id": "123",
//   "name": "Car Wash",
//   "price": 500
// }
// data : service ma 
// {
//   "success": true,
//   "data": {
//     "_id": "123",
//     "name": "Car Wash",
//     "price": 500
//   }
// }
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
export const updateService = async (req,res)=>{
    try{
        const service = await Service.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true, // its a mongoose option , which is used in update operation to 
        });
        if(!service){
            return res.status(404).json({
                success:false,
                message: "Service not found",
            });
        }
        res.status(200).json({
            success:true,
            message:"Service not found",
        });
    
    }catch(error){
        res.status(400).json({
            success:true,
            message:error.message,
        });
    }
}
export const deleteService = async(req,res)=>{
    try{
        const service = await Service.findByIdAndDelete(req.params.id);
        if(!service){
            return res.status(400).json({
                success:false,
                message:"Service not found",
            });
        }
        res.status(200).json({
            sucess:true,
            message:"Service deleted successfully",
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};