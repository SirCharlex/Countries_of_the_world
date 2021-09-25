import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Activities from './modules/Activities';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';//nueva version de enzine
// import {addActivity} from '../src/store/actions/index.js'

configure({adapter: new Adapter()});

test('Reaccionar a enlace Countries', () => {
  render(<App />);
  const linkCountries = screen.getByText('Countries');
  // const linkElement = screen.getByText(/learn react/i);
  expect(linkCountries).toBeInTheDocument();
});

test('Reaccionar a enlace Activities', () => {
  render(<App />);
  const linkCountries = screen.getByText('Activities');
  // const linkElement = screen.getByText(/learn react/i);
  expect(linkCountries).toBeInTheDocument();
});

// describe('<Activities/>',()=>{
//   describe('estructura',()=>{
//     let envoltura;
//     beforeEach(()=>{
//       envoltura = shallow(<Activities/>); 
//     })
//     it('Renderiza un <form>',()=>{
//       expect(envoltura.find('form')).toHaveLength(1)
//     })
//   })
// })

// describe('Manejo de inputs con estado', () => {
//   let envoltura, useState, useStateSpy;
//   beforeEach(() => {
//       useState = jest.fn();
//       useStateSpy = jest.spyOn(React, 'useState')
//       useStateSpy.mockImplementation((init) => [init, useState]);
//       envoltura = shallow(<Activities />)
//   });
// })
// describe('Deberia retornar una acción  con las propiedades type: ADD_ACTIVITY y payload: con los datos de la actividad', ()=>{
//   const activity={
//     name: 'ECOTURISMO',
//     difficulty: '3',
//     duration: '6 hours',
//     seasons: 'spring',
//     alphas: ['COL', 'ARG', 'PER'],
//   };

  // expect(addActivity(activity)).toEqual({
  //   type: 'ADD_ACTIVITY',
  //   payload: {
  //     id: 2,
  //     name: 'ECOTURISMO',
  //     difficulty: '3',
  //     duration: '6 hours',
  //     seasons: 'spring',
  //     alphas: ['COL', 'ARG', 'PER'],
    // }
  // })
// })
