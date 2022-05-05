module.exports = {
    asyncHandler: (cb) =>{
        return async(req, res, next) => {
            try {
                await cb(req, res, next)
            } catch(error){
                console.log(error);
                if (error.name === 'ValidationError') {
                    return res.status(400).json({ error });
                } else {
                    res.status(500).send(error);
                }
            }
        }
    },
}