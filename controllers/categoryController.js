const {Category} = require('../models')
class CategoryController {
    static async fetchData(req,res,next){
        try {
            const fetch = await Category.findAll({
                attributes:{
                    exclude: [`createdAt`, `updatedAt`]
                }
            })
            res.status(200).json(fetch)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CategoryController