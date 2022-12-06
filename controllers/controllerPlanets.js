const { default: axios } = require("axios");


class ControllerPlanet{
    static async getMainPlanets(req,res, next){
        try{
            
            const planets = await axios({
                url:"https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true&data=id,englishName",
                method:"get"
            })

            

            console.log(planets.data.bodies);
            res.status(200).json(
                planets.data.bodies
            )
        }catch(error){
            console.log(error);
            res.status(500).json({
                message:error
            })
        }
    }

    static async getPlanetDetail(req, res, next){
        try{    
            let {planetName} = req.params

            console.log(req.params);
            const planet = await axios({
                url:`https://api.le-systeme-solaire.net/rest/bodies?filter[]=englishName,cs,${planetName}&exclude=name,perihelion,aphelion,eccentricity,inclination,mass[{massExponent}],vol[{volumeExponent}],escape,meanRadius,equaRadius,polarRadius,flattening,dimension,sideralOrbit,sideralRotation,aroundPlanet,alternativeName,axialTilt,mainAnomaly,argPeriapsis,longAscNode`,
                method:"get"
            })

            console.log(planet);
            res.status(200).json(planet.data.bodies)
        }catch (error){
            console.log(error);
        }
    }
}

module.exports = ControllerPlanet