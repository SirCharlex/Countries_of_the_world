/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, Activity, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  alpha: 'ARG',
  name: 'Argentina',
  region: 'Americas',
  flag: "https://restcountries.eu/data/arg.svg",
  capital: "Buenos Aires"
};

const activity={
  name: 'rafting',
  difficulty: '5',
  duration: '3 hours',
  seasons: 'spring',
  alphas: ['COL', 'ARG', 'PER'],

}
const failactivity={
  name: 'rafting',
  difficulty: '5',
  duration: '3 hours',
  seasons: 'spring',
  alphas: [],

}

// describe('Country routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//                 // No se puede conectar a la base de datos:
//     console.error('Unable to connect to the database:', err); 
//   }));
//   beforeEach(() => Country.sync({ force: true })
//     .then(() => Country.create(country)));
//   describe('GET /countries', () => {
//     it('should get 200', () =>
//       agent.get('/countries').expect(200)
//     );
//   });
// });

// describe('Activity Routes', () =>{
//   before(() => conn.authenticate()
//   .catch((err) => {
//                 // No se puede conectar a la base de datos:
//     console.error('Unable to connect to the database:', err); 
//   })); 
//   beforeEach(() => Activity.sync({ force: true }));
//   it('No se debe crear una actividad que no este asociada por lo menos a un pais', ()=>
//     agent.post('/activities')
//     .send(failactivity)
//     .then((res) =>{
//       expect(res.status).to.be.equal(400);
//     })
//   );

//   it('Debe permitir crear una actividad que este completa', ()=>
//     agent.post('/activities')
//     .send(activity)
//     .then((res)=>{
//       expect(res.status).to.be.equal(200);
//     })
//   );
// });

// describe('Detail Routes',()=>{
//   before(() => conn.authenticate()
//   .catch((err) => {
//                 // No se puede conectar a la base de datos:
//     console.error('Unable to connect to the database:', err); 
//   }));
//   it('Debe presentar la información detallada de un Pais seleccionado', ()=>
//   agent.get('/countries/ARG')
//     .then((res)=>{
//       // console.log('res xxxxxxxxxxxxxxxxxxx')
//       // console.log(res.body.name)
//       expect(res.body.name).to.be.equal('Argentina')
//       expect(res.body.alpha).to.be.equal('ARG')
//       expect(res.body.capital).to.be.equal('Buenos Aires')
//     })
//   )
  
//   it('Debe presentar la información de las actividades asociadas al Pais seleccionado', ()=>
//   agent.get('/countries/ARG')
//     .then((res)=>{
//       // console.log('res xxxxxxxxxxxxxxxxxxx')
//       // console.log(res.body.activities[0].name) 
//       expect(res.body.activities[0].name).to.be.equal('RAFTING')
//     })
//   )

// })