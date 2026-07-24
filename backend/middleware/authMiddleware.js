import jwt from 'jsonwebtoken';

export const verifyToken = async(req,res,next)=>{
try{
    // get Authorization header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success:true,
            message:"Access denied. No token provided.",
        });
    }
    // Etract token
    const token = authHeader.split(" ")[1];
    // Verify token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    // Store decoded data in request
    req.admin = decoded;

    // Move to next middleware/controller
    next();

}catch(error){
    return res.status(401).json({
        success:false,
        message: "Invalid or expired token.",
    });
}
};