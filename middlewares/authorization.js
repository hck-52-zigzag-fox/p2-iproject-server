async function authorizeRole(req,res,next){
  try {
    if(req.user.role !== 'girlfriend') {
      throw{
        name:"Forbidden"
      }
    }
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}

async function authorizeOrder(req,res,next){
  try {
    if(req.user.role !== "customer"){
      throw {
        name:"Forbidden"
      }
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {authorizeRole,authorizeOrder}