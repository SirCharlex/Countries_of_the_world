import {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import './models.css'
import React from 'react';
import {pagination, sorting, filtering, changePage, milesFormat} from './Utilities.js'
import {getCountries, getActivities} from '../store/actions/index.js'//redux
import { connect } from 'react-redux';
import arrowUp from './arroup.png'
import arrowDown from './arrowdown.png'


function  AllCountries({getCountries, getActivities, storeWorld, storeActivities}){ //Versison con redux    
    const [actualPage, setActualPage] = useState(1);
    // let worldbueno = [];
    const [world, setWorld] = useState([]);
    const [value, setValue] = useState(0); ///esto es un truco sucio para actualizar estados 
    //de otros componentes que por alguan razon no se renderizan.....

    function handlePage(e){
        e.preventDefault();
        let buttonName = e.target.name;
        let page = changePage(buttonName, world, actualPage)
        setActualPage(page);
        setValue(value +1);
    }

    const handleSort = function(e){
        e.preventDefault();
        const sortCriretion = e.target.value;
        let newArray = JSON.parse(JSON.stringify(world));
        if (newArray.length){
            let order =  sorting(sortCriretion, newArray)
            newArray =  pagination(order);
            setWorld(newArray);
            setActualPage(1);
            setValue(value +1);
        }
    }

     //filtro x region y/o Actividad  - Ordenamiento AZ / ZA y/o Min-Max / Max-Min
    const handleFilter  = function(e){
        e.preventDefault();
        let filteredOut=[];
        let arrayFilter = storeWorld;
        const filterRegion = document.getElementsByName('filter region');
        const filterActivity = document.getElementsByName('filter activities');
        const findName = document.getElementsByName('search by name');
        const mySort = document.getElementsByName('sort')
        filteredOut = filtering(filterActivity, findName, filterRegion, arrayFilter)
        if (filteredOut.length){
            let sortArray = sorting(mySort[0].value, filteredOut)
            arrayFilter = pagination(sortArray);
            setActualPage(1);
            setWorld(arrayFilter);
            setValue(value +1);
        }else{
            alert('No results found');
            filterRegion[0].value = 'All';
            filterActivity[0].value = 'All';
            findName[0].value = ''
            mySort[0].value = 'None'
            setWorld(pagination(storeWorld));
            setValue(value +1);

            // getCountries();
            // setActualPage(1);
        }
    }

    function nameAZ(){
        document.getElementsByName('sort')[0].value = 'Name (A-Z)'
        setWorld(pagination(sorting('Name (A-Z)', world)));
        setValue(value +1);
    }
    function nameZA(){
        document.getElementsByName('sort')[0].value = 'Name (Z-A)'
        setWorld(pagination(sorting('Name (Z-A)', world)));
        setValue(value +1);
    }
    function PopulationMaxMin(){
        document.getElementsByName('sort')[0].value = 'Population (Max-Min)'
        setWorld(pagination(sorting('Population (Max-Min)', world)));
        setValue(value +1);
    }
    function PopulationMinMax(){
        document.getElementsByName('sort')[0].value = 'Population (Min-Max)'
        setWorld(pagination(sorting('Population (Min-Max)', world)));
        setValue(value +1);
    }
    function AreaMaxMin(){
        document.getElementsByName('sort')[0].value = 'Area (Max-Min)'
        setWorld(pagination(sorting('Area (Max-Min)', world)));
        setValue(value +1);
    }
    function AreaMinMax(){
        document.getElementsByName('sort')[0].value = 'Area (Min-Max)'
        setWorld(pagination(sorting('Area (Min-Max)', world)));
        setValue(value +1);
    }
    
    
    useEffect(()=>{
        getCountries()
        getActivities()
    },[])

    if (storeWorld.length >0){
        if(world.length<=0){
            setWorld(pagination(storeWorld));
        }
    }


    return(
        <div className='pagecountries'>
            <form className='formCountries'>
                <div className='cajita'>
                    <label>Search by Name</label>
                    <div>
                        <input name ='search by name' type='search' className='anchoestandar' ></input>
                        <button className='mybutton2' onClick={e=>handleFilter(e)}>Search</button>
                    </div>
                </div>
               
                <div className='cajita'>
                    <label>Filter by Region</label>
                        <select className='anchoestandar' name='filter region' onChange={e=>handleFilter(e)}>
                            <option>All</option>
                            <option>Africa</option>
                            <option>Americas</option>
                            <option>Asia</option>
                            <option>Europe</option>
                            <option>Oceania</option>
                            <option>Polar</option>
                        </select>
                </div>
                <div className='cajita'>
                    <label>Filter by Tourist Activity</label>
                    {/* hacer map con las actividades turisticas, no olvidar el return*/}
                    <select className='anchoestandar' name='filter activities' onChange={e=>handleFilter(e)}>
                        <option value ='All'>All</option>
                        {storeActivities.length && storeActivities.map(arg =>{
                            return (
                                <option key={arg.id} value={arg.name} >{arg.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='cajita'>
                    <label>Order by:</label>
                    <select  name='sort' className='anchoestandar' onChange={e=>handleSort(e)}>
                        <option value='None'>None</option>
                        <option value='Name (A-Z)'>Name (A-Z)</option>
                        <option value='Name (Z-A)'>Name (Z-A)</option>
                        <option value='Population (Max-Min)'>Population (Max-Min)</option>
                        <option value='Population (Min-Max)'>Population (Min-Max)</option>
                        <option value='Area (Max-Min)'>Area (Max-Min)</option>
                        <option value='Area (Min-Max)'>Area (Min-Max)</option>                        

                    </select>
                </div>
                <div className='cajita'>
                   
                </div>
                
            </form>

            {/* Paises */}
            <div className = 'cajapaises'>
                <div className='groupbuttons'>
                    <button name='startPage' type='submit' className='mybutton'onClick={e=>handlePage(e)}>Start Page</button>
                    <button name='previous' type='submit' className='mybutton'onClick={e=>handlePage(e)}>Back Page</button>
                    <label >Coutries Result: {world.length}</label>
                    <label >Page: {actualPage} / {world.length && world[world.length-1].page}</label>
                    <button name='next' type='submit' className='mybutton' onClick={e=>handlePage(e)}>Next Page</button>
                    <button name='endPage' type='submit' className='mybutton' onClick={e=>handlePage(e)}>End Page</button>
                </div>

                {/* Titulos */}
                <div className='titulos'>
                    <span className='titulo2'>Alpha</span>
                    <div  className='titulo3'>
                        <span>Name</span>
                        <div>
                            <img className='arrowdown' src={arrowDown} alt="arrowDown" onClick={nameZA}/>
                            <img className='arrowup' src={arrowUp} alt="arrowUp" onClick={nameAZ}/>
                        </div>

                    </div>
                    <span className='titulo1'>Flag</span>
                    <span className='titulo4'>Region</span>

                    <div className='titulocifras'>
                        <span>Population</span>    
                        <div>
                            <img className='arrowdown' src={arrowDown} alt="arrowDown" onClick={PopulationMinMax}/>
                            <img className='arrowup' src={arrowUp} alt="arrowUp" onClick={PopulationMaxMin}/>
                        </div>
                    </div>
                    <div className='titulocifras'>
                        <span>Area km²</span>
                        <div>
                            <img className='arrowdown' src={arrowDown} alt="arrowDown" onClick={AreaMinMax}/>
                            <img className='arrowup' src={arrowUp} alt="arrowUp" onClick={AreaMaxMin}/>
                        </div>
                    </div>
                    {/* <span className='titulocifras'>Page</span> */}
                </div>
                <div>
                    {/* {storeWorld.length && storeWorld.map(arg=>{ */}
                    {/* {console.log('actualPage', actualPage)} */}
                    {/* {world.length && world.filter(arg => arg.page === actualPage ).map(arg=>{ */}
                    {/* {console.log('worldbueno de nuevo'), console.log(worldbueno)} */}
                        {world.length && world.filter(arg => arg.page === actualPage ).map(arg=>{
                        return (
                            <div key={arg.alpha} className='container'>
                                {/* <span className='alphas'>{arg.alpha}</span> */}
                                <NavLink className='alphas' to={`/countries/${arg.alpha}`}>{arg.alpha}</NavLink>
                                <span className='name'>{arg.name}</span>
                                <div className='containerflag'>
                                    <img className='flag' src={arg.flag} alt='img'/>
                                </div>
                                <span className='region'>{arg.region}</span>
                                <span className='csscifras'>{milesFormat(arg.population)}</span>
                                <span className='csscifras'>{milesFormat(arg.area)}</span>
                                {/* <span className='csspage'>{arg.page}</span> */}
                            </div> 
                        )    
                    })}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        storeWorld: state.worldState,
        storeActivities: state.activitiesState
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        getCountries: country =>{
            dispatch(getCountries(country))
        },
        getActivities: activity=>{
            dispatch(getActivities(activity))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps )(AllCountries)
