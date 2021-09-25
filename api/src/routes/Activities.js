const { Router } = require('express');
const { Country, Activity, country_activity } = require('../db.js')
const { Sequelize } = require('sequelize');
const router = Router();

//este es adicional, no lo pide el proyecto
router.get('/',  (req, res)=>{

    Activity.findAll({
        order: ['name'],
    })
    .then(actividades =>{
        res.json(actividades);
    }) 
        
})


//Consulta en postgres SQL para Tabla activities:
//select id, name, difficulty, duration, seasons from activities order by name;

router.post('/', (req, res)=>{
    console.log(req.body);
    // trae campos del body: name, difficulty, duration, seasons
    // además debe traer el array de los alpha's de los paises que tendrán esta actividad
    // alphas no esta en la base de datos de activities, solo es la referencia

    //Que pasa si la actividad ya existe?
    //  debería traerla?
    // como le vinculo una actividad existente a un país que no la tenía?
    const {name, difficulty, duration, seasons, alphas, time_type } = req.body;

    if(name && difficulty && duration && seasons && alphas.length && time_type){
        //1 buscar el nombre
        //2 crear actividad no existe
        //3 rechazar si la actividad ya existe  
        Activity.findOne({
            where: {
                name: name,
            }
        })
        // para verificacion propia:
            // 1 Revisar en POSTMAN 
            // 2 hacer un get para todas las actividades creadas
        .then(myActivity =>{
            // console.log(myActivity);

            if(!myActivity){
            let upperName = name.toUpperCase();
                Activity.create({
                    // where:{
                        name: upperName,
                        difficulty: difficulty,
                        duration: duration,
                        seasons: seasons,
                        time_type: time_type,
                    // }
                })
                .catch(error =>{
                    console.log(error);
                })
                .then(myActivity =>{
                    //myActivity es un array, sin embargo le creación es una a una
                    //por eso esta en la posciión cero, dataValues.id obtiene el id de
                    // la actividad creada o buscada
                    // let idActivity = myActivity[0].dataValues.id;
                    // console.log(idActivity);
            
                    if (alphas.length){ //si hay alphas por req.body
                        for (let x = 0; x < alphas.length; x++){
                            // console.log(alphas[x]);

                            Country.findOne({
                                where:{
                                    alpha: alphas[x],
                                },
                                // include: Activity,
                            })
                            .catch(error=>{
                                console.log(error);
                            })
                            .then(foundCountry =>{
                                // console.log(foundCountry);
                                // console.log(foundCountry.dataValues.activities);
                                // res.json(foundCountry);
                                
                                // console.log(country_activity);
                                // console.log('id del Activity :' + myActivity.dataValues.id);
                                // si el pais ya tiene la actividad asignada, no la debe asignar
                                
                                
                                // si alphas[x] coincide con el alpha de un pais
                                // se vincula a través de la relación con activities
                                // Agregando a la actividad el pais
                                //Mi Activity: actividad creada
                                //foundCountry: pais encontrado por codigo ALPHA
                                myActivity.addCountry(foundCountry);
                                // console.log(foundCountry);
                            })


                        }
                    }
                    // console.log(myActivity);
                    return res.json(myActivity);
                })
            }else{
                return res.json(myActivity);
            }
        })

    }else{
        
        return res.status(400).send('Debe llenar todos los campos');
    }
})

module.exports = router;