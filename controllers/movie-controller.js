export const addMovie = async(req, res, next)=>{
    const extractedToken = req.headers.authorization; // Bearer token
    if(!extractedToken && extractedToken.trim()===""){
        return res.status(404).json({message: "invalid token"})
    }
}
export const getMovie = async(req, res, next)=>{   
     const nextMovie = req.headers.authorization; // Bearer token
     if(!nextMovie && nextMovie.trim()===""){
         return res.status(404).json({message: "invalid token"})
     }
}
