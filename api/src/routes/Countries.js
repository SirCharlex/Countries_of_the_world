const { Router } = require('express');
const  fetch  =  require ( 'node-fetch' ); 
// const {allCountries} = require('./utilities')
const { Country, Activity } = require('../db.js')
const { Sequelize, ValidationError } = require('sequelize');
const Op = Sequelize.Op;
const router = Router();

//Get trae y almacena todos los paises en la base de datos.
/*holi por que funciona???
consulta de postgresSQL a la tabla countries=# :
select id, alpha, name, region, sub_region, capital, area, population from countries order by alpha;
*/
//en index se define el camino correcto /countries
router.get('/', async  (req, res)=>{
    const name = req.query.name;

    const validateBD = function (){
        Country.findOne({where:{alpha: 'COL'}})
        .catch(error =>{console.log(error)})
        .then(found =>{
            // console.log(found);
            if(!found){
                allCountries()
            }
        })
        displayCountries();
    }

    const allCountries = async function (){
        return fetch("https://restcountries.eu/rest/v2/all")
        .then(response => response.json())
        .then(async (recurso) => {
            if (recurso.length){
                const arrayCountries = await recurso;
                
                await arrayCountries.map(arg =>{
                    let myID = arg.alpha3Code;
                    let myName = arg.name;
                        if (myName === 'Åland Islands') myName = 'Aland Island';
                    let myFlag = arg.flag;
                    let myRegion = arg.region;
                    let myCapital = arg.capital;
                        if (myCapital === 'Papeetē') myCapital = 'Papeete';
                        if (myCapital === 'Chișinău') myCapital = 'Chisinau';
                    let mySubRegion = arg.subregion;
                    let myArea = Number(arg.area);
                    let myPopulation = Number(arg.population);
                    // let myPage = numPage;

                    Country.create({
                        alpha: myID,
                        name: myName,
                        flag: myFlag,
                        region: myRegion,
                        capital: myCapital,
                        sub_region: mySubRegion,
                        area: myArea,
                        population: myPopulation,
                        // page: myPage
                    });
                });
            };
        })
    }
    
    function displayCountries(){
        Country.findAll({
            attributes:  ['alpha', 'name', 'flag', 'region', 'population', 'area'], 
            // where: {page: reqPage},
            // order: ['alpha'],
            include: Activity,
            // foo.findAll({
            //     where      : where,
            //     attributes : attributes,
            //     include    : [{ model: bar, attributes: attributes}]
            // }).success(function (result) {
        })
        .then(countries =>{
            if (countries.length){
                // console.log(countries)
                return res.json(countries);
            }else{
                // console.log('no llegaron los paises')
                // displayCountries();
                res.send('no llegaron los paises')
                
            }
        })
    }
    
    
    if(name){
        let findName = name.slice(0,1).toUpperCase() + name.slice(1, name.length).toLowerCase();
        Country.findAll({
            where:{
                name:{
                    [Op.like]: `%${findName}%`
                }
            },
        })
        .then(country =>{
            res.json(country);
        })
    }else{
        validateBD();
    }
})  
    
    
/*
COUNTRIES
ID (Código de 3 letras) *
Nombre *
Imagen de la bandera *
Continente *
Capital *
Subregión
Área
Población

ACTIVITIES
ID
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera)
*/

// router.get('/', (req, res)=>{
//     

// }) 

router.get('/:idPais', (req, res) => {
    const {idPais} = req.params;
        // console.log(idPais);
    let upperID = idPais.toUpperCase();
    Country.findOne({
        attributes:['alpha', 'name', 'flag', 'region', 'sub_region', 'capital', 'area', 'population'],
        where:{
            alpha: upperID,
        },
        include:  Activity,           
    }).then(todo =>{
        if(!todo) return res.status(400).send('País no encontrado');
        return res.json(todo);
    })
});




module.exports = router;