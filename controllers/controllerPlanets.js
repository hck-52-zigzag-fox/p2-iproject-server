const { default: axios } = require("axios");
const {Object} = require("../models")
const { Op } = require("sequelize");

class ControllerPlanet{
    static async getMainObjects(req,res, next){
        try{
            
            // const planets = await axios({
            //     url:"https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true&data=id,englishName",
            //     method:"get"
            // })

            const objects = await Object.findAll(
            )

            // console.log(objects.data.bodies);
            res.status(200).json(
                // planets.data.bodies
                objects
            )
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:error
            })
        }
    }

    static async getObjectDetail(req, res, next){
        try{    
            let {planetName} = req.params

            console.log(req.params);
            const object = await Object.findOne({
                where:{name:{[Op.iLike]: `%${planetName}%`}}
            })

            const detailObject = await axios({
                url:`https://api.le-systeme-solaire.net/rest/bodies?filter[]=englishName,cs,${planetName}&exclude=name,perihelion,aphelion,eccentricity,inclination,mass[{massExponent}],vol[{volumeExponent}],escape,meanRadius,equaRadius,polarRadius,flattening,dimension,sideralOrbit,sideralRotation,aroundPlanet,alternativeName,axialTilt,mainAnomaly,argPeriapsis,longAscNode,discoveredBy,discoveryDate`,
                method:"get"
            })

            // console.log(detailObject);
            object.dataValues.detailObject = detailObject.data.bodies

            console.log(object);
            res.status(200).json(object)
        }catch (error){
            console.log(error);
        }
    }
}

module.exports = ControllerPlanet