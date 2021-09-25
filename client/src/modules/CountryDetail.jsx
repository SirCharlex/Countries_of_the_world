import {useState, useEffect} from 'react';
import {WORLD_URL} from '../constants'
import './models.css'

export default function CountryDetail(){
    const [detail, setDetail] = useState([]);
    const [detTourism, setDetTourism] = useState([])
    
    
    function getDetail(){
        var URLactual = window.location.href;
        URLactual = URLactual.slice(URLactual.length-3, URLactual.length)
        return fetch(WORLD_URL+ '/' + URLactual)
        .then(response => response.json())
        .then(det => {
            // console.log(det);
            setDetail(det);
            setDetTourism(det.activities);
        })
    }
    // console.log(detTourism);
    useEffect(()=>{
        getDetail();
    },[]);
    
    // console.log(URLactual);

    return (
        <div className = 'details'>
            <div className='simbol'>
                <h1>{detail.name}</h1>
                <img className='flag2' src={detail.flag} alt='flag'/>
            </div>
            {/* Detalles */}
            <div className = 'cardActivity'>
                <h3>Details</h3>
                <div className='bloque'>
                    <label >Alpha Code:</label>
                    <span>{detail.alpha}</span>    
                </div>
                <div className='bloque'>
                    <label>Capital:</label>
                    <span>{detail.capital}</span>    
                </div>
                <div className='bloque'>
                    <label>Region:</label>
                    <span>{detail.region}</span>    
                </div>
                <div className='bloque'>
                    <label>Sub Region:</label>
                    <span>{detail.sub_region}</span>    
                </div>
                <div className='bloque'>
                    <label>Area:</label>
                    <span>{Math.round(Number(detail.area) / 1000)} millions km²</span>    
                </div>
                <div className='bloque'>
                    <label>Population:</label>
                    <span >{detail.population}</span>    
                </div>
            </div>
                <div className = 'cardActivity'>
                <h3>Tourist Activities</h3>
                {detTourism.length ? detTourism.map(arg=>{
                    return(
                        <div className='onecard'>
                            <div className='bloque'>
                                <label>Name</label>
                                <span>{arg.name}</span>
                            </div>
                            <div className='bloque'>
                                <label>Difficulty</label>
                                <span>{arg.difficulty}</span>
                            </div>
                            <div className='bloque'>
                                <label>Duration</label>
                                <span>{arg.duration}</span>
                            </div>
                            <div className='bloque'>
                                <label>Seasons</label>
                                <span>{arg.seasons}</span>
                            </div>

                        </div>
                    )
                }):<span>Activities not found</span>} 
            </div>
        </div>
    )
}