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
// ... rest parameter authorization chhe aa means kon su kari sake te 
// like role ma admin.role bi save kare chhe controller ma
export const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.admin.role)){
            return res.status(403).json({
                success:false,
                message:"Access denied"
            });
        }
        next();
    }
}
// how it is worked 
// s-1 : User login means frontend the send the request
// Body (JSON): {
//    "email":"admin@gmail.com",
//    "password":"admin123"
// }
// so this req is come to the server.js -> app.use("/api/admin",adminRoutes);
// so server.js route  ma thi jase router.post("/login",loginAdmin); - means post /login  -. so it calles the loginAdmin();
// so aa to adminConroller.js ma chhe 
// s-4 : controler -> loginAdmin() ->
// router.get(
// "/profile",
// verifyToken,
// getProfile
// ); so here before contoller fujction we have verifyToken that ensure that the  that is also konwn as a middleware in authMiddleware.justifyContent: 
// const authHeader
// Frontend

// ↓

// POST /login

// ↓

// server.js

// ↓

// adminRoutes.js

// ↓

// loginAdmin()

// ↓

// bcrypt.compare()

// ↓

// jwt.sign()

// ↓

// TOKEN

// ========================

// Frontend stores token

// ========================

// GET /profile

// Header
// Bearer Token

// ↓

// server.js

// ↓

// adminRoutes.js

// ↓

// verifyToken()

// ↓

// jwt.verify()

// ↓

// req.admin

// ↓

// next()

// ↓

// getProfile()

// ↓

// Admin Data

// now authorizeroles() rakho darek route ma ke aa khali aa role j access karoi sate tena mate chhe 

// ex.1 router.delete(
//"/service/:id",
//verifToken, // admin je token save chhee te atch kar se and compare karse if true tge   aagad vadh se 
// authorizeRoles("admin"),
// deketeService _. controller function ae to last me so after auhnetication and authorixatyion
//s-)