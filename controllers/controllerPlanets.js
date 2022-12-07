const { default: axios } = require("axios");
const { Object } = require("../models")
const { Op } = require("sequelize");

class ControllerPlanet {
    static async getMainObjects(req, res, next) {
        try {

            // const planets = await axios({
            //     url:"https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true&data=id,englishName",
            //     method:"get"
            // })

            const objects = await Object.findAll({ where: { customObject: false } }
            )

            // console.log(objects.data.bodies);
            res.status(200).json(
                // planets.data.bodies
                objects
            )
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getObjectDetail(req, res, next) {
        try {
            let { planetName } = req.params

            console.log(req.params);
            const placeholder = {}

            const object = await Object.findOne({
                where: { name: { [Op.iLike]: `%${planetName}%` } }
            })

            const detailObject = await axios({
                url: `https://api.le-systeme-solaire.net/rest/bodies?filter[]=englishName,cs,${planetName}&exclude=name,perihelion,aphelion,eccentricity,inclination,mass[{massExponent}],vol[{volumeExponent}],escape,meanRadius,equaRadius,polarRadius,flattening,dimension,sideralOrbit,sideralRotation,aroundPlanet,alternativeName,axialTilt,mainAnomaly,argPeriapsis,longAscNode`,
                method: "get"
            })


            // console.log(detailObject);

            if (!detailObject) {
                throw { name: "Object not found" }
            }
            const nasaPictures = await axios({
                url: `https://images-api.nasa.gov/search?q=${planetName}&media_type=image&year_start=2010`,
                method: "get"
            })

            // const nasaVideos = await axios({
            //     url:`https://images-api.nasa.gov/search?q=${planetName}&media_type=video&year_start=2010`,
            //     method:"get"
            // })

            let pictures = []
            nasaPictures.data.collection.items.forEach((el, index) => {
                // console.log(index);
                if (index < 5) {
                    // console.log(el);
                    // console.log(`this`);
                    pictures.push(el)
                }
                index++
            })

            // let videos = []
            // nasaVideos.data.collection.items.forEach((el, index)=>{
            //     if(index < 5){
            //         videos.push(el)
            //     }

            //     index++
            // })

            // console.log(pictures.length);
            // console.log(nasaPictures.data.collection.items);
            // console.log(nasaPictures.data.collection.items.length);

            if (object) {
                placeholder.object = object
            }
            placeholder.detailObject = detailObject.data.bodies
            placeholder.pictures = pictures
            // placeholder.videos = videos
            // console.log(object);
            res.status(200).json(placeholder)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async createObject(req, res, next) {
        try {

            const discoveredBy = req.user.email
            
            let x = new Date().getDate()
            let y = new Date().getMonth()
            let z = new Date().getFullYear()
            const discoveryDate = `${x}/${y}/${z}`

            const { name, type, imageUrl } = req.body
            const customObject = true
            let object = await Object.create({ name, type, imageUrl, discoveredBy, discoveryDate, customObject })

            res.status(201).json({
                object
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ControllerPlanet