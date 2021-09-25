import {useState, useEffect} from 'react';
import {posting, sorting, arrayDropSelect, customStyles} from './Utilities.js' 
import {getActivities, getCountries} from '../store/actions/index.js'
import Select from 'react-select';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import './models.css'

function Activities({getCountries, storeWorld, getActivities, storeActivities}){
    const [selectCountry, setSelectCountry] = useState([]);
    const [upperName, setUpperName] = useState();

    function handleUpperCase(e){
        setUpperName(e.target.value.toUpperCase());
    }
  
    function  handleCheck(e){
        // console.log(e)
        let alpha = e.map(arg=> arg.value)
        setSelectCountry(alpha);
        // console.log(alpha)
        // if(alpha){setSelectCountry([...selectCountry, alpha])

        // if(e.target.value){setSelectCountry([...selectCountry, e.target.value])
        // }else{
        //     const filterCountry = selectCountry.filter(alpha => alpha !== e.target.value);
        //     setSelectCountry(filterCountry);
        // }
        // console.log(selectCountry)
    }

    function postActivity(e){
        //trae un array con todos los elementos del DOM que coincidan con ese nombre
        // console.log('hola')
        let myName=  document.getElementsByName('name');
        let myDifficulty=  document.getElementsByName('difficulty');
        let mySeason=  document.getElementsByName('seasons');
        let myDuration=  document.getElementsByName('duration');
        let myTimeType = document.getElementsByName('time_type');
        let myAlphas = selectCountry;
        if (myName[0].value && myDifficulty[0].value && mySeason[0].value && myDuration[0].value && myTimeType && myAlphas.length){      
            //revisar si la actividad ya exite para rechazar con una alerta
            let verifyActivity = storeActivities.find(arg => arg.name === myName[0].value);
            if (!verifyActivity){
                let myActivity= {
                    "name": myName[0].value,
                    "difficulty": myDifficulty[0].value,
                    "seasons": mySeason[0].value,
                    "duration": myDuration[0].value,
                    "time_type":  myTimeType[0].value,
                    "alphas": myAlphas,
                };
                posting(myActivity);
                getActivities();

            }else{
                alert('the activity already exists, you cannot add it again')
            }
        }else{
            e.preventDefault();//Si esta incompleto, los datos no deben desaparecer
            return alert('You must fill in all the fields of the form and select at least one country for the activity');
        }
    }

    

    useEffect(()=>{
        getCountries();
        getActivities();
    },[]);
    // let orderWorld = sorting('Name (A-Z)', storeWorld)
    let orderWorld = arrayDropSelect('Name (A-Z)', storeWorld)

       
    // let orderWorld = orderArray(storeWorld)
    return (
        <form className='grupoform' onSubmit={(e)=>postActivity(e)}>
            <div className='pageactivities'>
                
                {/* <div className='subcontainer'>  */}
                <div>
                    <div className='titulocategorias'>
                        <h3>Add Tourist Activities</h3>
                        <div className="contieneBoton">
                            <button className='mybutton' type='submit' >Add</button>
                        </div>  
                    </div>
                    {/* <form className='grupoform' onSubmit={(e)=>postActivity(e)}> */}
                        <div className='formActivity'>
                            <div className="contiene_input">
                                <label className='milabel'>Name:</label>
                                <input className = 'miinput' type='text' name='name' value = {upperName} onChange={e=> handleUpperCase(e)}></input>
                            </div>
                            <div className="contiene_input">
                                <label className='milabel'>Difficulty:</label>
                                <select className = 'listOption' name='difficulty'>
                                    <option value = '1'>1</option>
                                    <option value = '2'>2</option>
                                    <option value = '3'>3</option>
                                    <option value = '4'>4</option>
                                    <option value = '5'>5</option>
                                </select>
                            </div>  
                            <div className="contiene_input">
                                <label className='milabel'>Duration:</label>
                                <div className='doslistas'>
                                    <input className = 'listOption2' type='number' min='1' name='duration' ></input>
                                    <select className = 'listOption3' name='time_type'>
                                        <option value = 'minutes'>hours</option>
                                        <option value = 'hours'>days</option>
                                        <option value = 'days'>week</option>
                                    </select>
                                </div>                      
                            </div> 
                            <div className="contiene_input">
                                <label className='milabel'>Seasons:</label>
                                <select className = 'listOption' name='seasons'>
                                    <option value = 'summer'>summer</option>
                                    <option value = 'fall'>fall</option>
                                    <option value = 'winter'>winter</option>
                                    <option value = 'spring'>spring</option>
                                </select>
                            </div>
                            <div className="contiene_input">
                                <label className='milabel'>Countries:</label>
                                {orderWorld && <Select  styles={customStyles} className='superlista' options={orderWorld} isMulti='true' isSearchable='true'onChange={e=> handleCheck(e)}/>}
                            </div>
                        </div>
                    {/* </form>  */}
                </div>
                
                {/* Tabla de Activities */}
                <h2 className='tituloActividades'>Activities</h2>
                <div className='tabla'>
                    {/* Titulos */}
                    <div className='titulos'>
                        
                        <span className='nombreactividad'>Name</span>
                        <span className='titulo4'>Season</span>
                        <span className='titulo4'>Difficulty</span>
                        <span className='titulo4'>Duration</span>
                        <span className='titulo4'>Time Type</span>

                    </div>

                    {/* Activities */}
                    {storeActivities && console.log(storeActivities)}
                    {storeActivities && storeActivities.map(arg=>{
                        return (

                            <div key={arg.id} className='containeractiv'>
                                <span  className='cssactividad'>{arg.name}</span>
                                <span className='region'>{arg.seasons}</span>
                                <span className='region'>{arg.difficulty}</span>
                                <span className='region'>{arg.duration}</span>
                                <span className='region'>{arg.time_type}</span>
                            </div>          
                        )           
                    })}
                </div>
                

            </div>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Activities);