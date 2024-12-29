import jwt from 'jsonwebtoken';

export const generateJWT = (userID,res) => {
   
    const token = jwt.sign({userID},process.env.JWT_SECRET,{
        expiresIn: '30d'
    })

    res.cookie("jwt",token,{
        hhtpOnly: true,
        sameStrict: true,
        maxAge: 30*24*60*60*1000,
        secure: process.env.NODE_ENV !== 'development' 
    })

    return token;
}