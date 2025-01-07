const notFound=(req,res,next)=>{
    const err=new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(err);
};




module.exports={notFound}