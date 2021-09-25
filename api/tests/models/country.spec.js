const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');
const country = {
  alpha: 'ARG',
  name: 'Argentina',
  region: 'Americas',
  flag: "https://restcountries.eu/data/arg.svg",
  capital: "Buenos Aires"
};

const country2 = {
  alpha: undefined,
  name: 'Colombia',
  region: 'Americas',
  flag: "https://restcountries.eu/data/arg.svg",
  capital: "Buenos Aires"
};

const country3 = {
  alpha: 'COL',
  name: undefined,
  region: 'Americas',
  flag: "https://restcountries.eu/data/arg.svg",
  capital: "Buenos Aires"
};

const country4 = {
  alpha: "PER",
  name: "Peru",
  region: undefined,
  flag: "https://restcountries.eu/data/per.svg",
  capital: "Lima",
};

const country5 = {
  alpha: 'PRY',
  name: 'Paraguay',
  region: 'Americas',
  flag: undefined,
  capital: "Asunción"
};

const country6 = {
  alpha: "CHL",
  name: 'Chile',
  region: 'Americas',
  flag: "https://restcountries.eu/data/chl.svg",
  capital: undefined
};

// describe('Country model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Country.sync({ force: true }));
//     describe('los datos del pais deben estar completos', () => {
//       it('debería arrojar un error si los datos obligatorios están vacios', (done) => {
//         Country.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
  //     it('deberia funcionar si los datos del pais están completos', () => {
  //       Country.create(country);
  //     });
      

  //     it('debe enviar error si el código alfa está vacío', (done) => {
  //       Country.create(country2)
  //       .then(()=> done(new Error('el código alfa no debe estar vacío')))
  //       .catch(()=>done());
  //     });
      

  //     it('debe enviar error si el nombre  está vacío', (done) => {
  //       Country.create(country3)
  //       .then(()=> done(new Error('el nombre  no debe estar vacío')))
  //       .catch(()=>done());
  //     });

  //     it('debe enviar error si la region está vacía', (done) => {
  //       Country.create(country4)
  //       .then(()=> done(new Error('la region no debe estar vacía')))
  //       .catch(()=>done());
  //     });

  //     it('debe enviar error si la bandera está vacía', (done) => {
  //       Country.create(country5)
  //       .then(()=> done(new Error('la bandera no debe estar vacía')))
  //       .catch(()=>done());
  //     });

  //     it('debe enviar error si la capital está vacía', (done) => {
  //       Country.create(country6)
  //       .then(()=> done(new Error('la capital no debe estar vacía')))
  //       .catch(()=>done());
  //     });
    });
  });
});
