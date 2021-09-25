import React from 'react';
import { NavLink } from 'react-router-dom';
import icono from './worldico.png'
import './models.css'


//vinculo a home, todas las ciudades y todas las actividades
export default function NavBar(){

    return (
        <div className = 'navbar'>
            <img className='icono' src={icono} alt='icono'/>
            <NavLink className='element' exact to="/" >Home</NavLink>
            <NavLink className='element'exact to="/countries" >Countries</NavLink>
            <NavLink className='element'exact to="/activities" >Activities</NavLink>
        </div>
    )
}