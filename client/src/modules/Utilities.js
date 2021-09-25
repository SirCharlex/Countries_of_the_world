
function  pagination(arrWorld){
    let pageWorld = arrWorld;
    // console.log(pageWorld.length);
    if (pageWorld.length){
    let count = 0;
    let myPage = 1;
        for (let x = 0; x < pageWorld.length; x++){
            // console.log(x);
            count++;
            pageWorld[x].page = myPage;
            // console.log(pageWorld[x].population);
            pageWorld[x].population = Number(pageWorld[x].population);
            // console.log(pageWorld[x].population);
            // console.log(pageWorld[x].page);
            if(count === 10){
                count = 0;
                myPage++;
            }
        }
        // console.log(pageWorld);
        return pageWorld;
    }
}

function findActivity(array, acty){
    //recibe por parametro una actividad y un array
    //devuelve un array con los paises que contengan la actividad
    if (acty !=='All'){
        let coutryActivity = [];
        for(let x = 0; x < array.length; x++){
            //si tiene un array con activities y la actividad coincide con el nombre
            if(array[x].activities.length){
                for (let y = 0; y < array[x].activities.length; y++ ){
                    if (array[x].activities[y].name === acty){
                        coutryActivity.push(array[x]);
                    }
                }
            }
        }
        // console.log(coutryActivity);
        return coutryActivity;
    }else{
        alert('findActivity NO debe recibir como parametro: ALL')
    }
}

function sorting (sortCriretion, newArray){
    if (sortCriretion !== 'None'){
        switch (sortCriretion){
            case 'Name (A-Z)':
                let arrAZ = newArray.sort((x,y)=>{
                    if (x.name > y.name){return 1};
                    if (x.name < y.name){return -1};
                    return 0;
                });
                newArray = arrAZ;
                break;

            case 'Name (Z-A)':
                let arrZA = newArray.sort((x,y)=>{
                    if (x.name < y.name){return 1};
                    if (x.name > y.name){return -1};
                    return 0;
                });
                newArray = arrZA;
                break;

            case 'Population (Min-Max)':
                let arrMaxMin = newArray.sort(function(a, b) {
                    return (a.population - b.population);
                });
                newArray = arrMaxMin;
                break;
                
            case 'Population (Max-Min)':
                let arrMinMAx = newArray.sort(function(a, b) {
                    return (b.population - a.population);
                });
                newArray = arrMinMAx;
                break;

            case 'Area (Max-Min)':
                let areaArrMaxMin = newArray.sort(function(a, b) {
                    return (b.area - a.area);
                });
                newArray = areaArrMaxMin;
                break;
            case 'Area (Min-Max)':
                let areaArrMinMAx = newArray.sort(function(a, b) {
                    return (a.area - b.area);
                });
                newArray = areaArrMinMAx;
                break;
            
            
            default:
                alert('handleSort debería tener un criterio');                
        }
    }
    return newArray;
}

 //filtra por ACTIVIDAD si esta fue seleccionada en el DOM
function filtering(filterActivity, findName, filterRegion, arrayFilter){
    if (filterActivity[0].value !== 'All'){
        let processActivity = findActivity(arrayFilter, filterActivity[0].value);
        arrayFilter = processActivity;
    }else{
        arrayFilter = arrayFilter; 
    }
    //Filtrar por NOMBRE de PAIS, si este fue escrito en el DOM
    if (findName[0].value.length){
        arrayFilter = arrayFilter.filter(arg => arg.name.toUpperCase().includes(findName[0].value.toUpperCase()))
    }
    //Filtra por REGION si esta fue selecionada en el DOM
    if (filterRegion[0].value !== 'All' ){
        arrayFilter =  arrayFilter.filter(arg => arg.region === filterRegion[0].value);
    }
    return arrayFilter
}

//mueve paginación de 10 en 10
function changePage(buttonName, array, page){
    switch(buttonName){
        
        case 'next':
            if(page < array[array.length-1].page){page++};
            break;
        
        case 'previous':
            if(page > array[0].page){page--};
            break;
        case 'startPage':
            page = array[0].page;
            break;
        case 'endPage':
            page = array[array.length-1].page;
            break;
        default: return page;
    }

    return page;
}

function posting(myActivity){
    fetch('http://localhost:3001/activities', {
        method: 'POST', // o 'PUT' para actualizar
        body: JSON.stringify(myActivity), // los datos pueden ser cadena u objeto 
        headers:{'Content-Type': 'application/json'}
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        console.log('Success:', response);
    })
}
function milesFormat(number){
    let letterNumber = number.toString();
    let decimals;

    if (letterNumber.includes('.')){
        decimals = letterNumber.split('.')[1]
        letterNumber = letterNumber.split('.')[0]
    }

    let longLetter = letterNumber.length-1
    let count =0;
    let newNumber = [];
    for (let x = longLetter; x >= 0; x--){
        count ++;      
        if (count === 3){
            count = 0;
            newNumber.unshift(letterNumber[x] + letterNumber[x+1] + letterNumber[x+2])
        }
    }

    let difference = letterNumber.length - newNumber.toString().replaceAll(',', '').length;
    if (difference>0){
        let remaining = letterNumber.slice(0, difference);
        newNumber.unshift(remaining);
    }

    if (decimals){
        newNumber.push('.' + decimals)
    }
return newNumber.toString()
};

function arrayDropSelect(orderMethod, array){
    const newArray=[];
    let temporal = sorting(orderMethod, array)
    for (let x = 0; x < temporal.length;x++){
        newArray.push(
            {
                label: temporal[x].name,
                value: temporal[x].alpha
            }
        )
        
    }
    // console.log('newArray',newArray)
    return newArray;

}
const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 5,
    }),
  
    control: (_, { selectProps: { width }}) => ({
      width: width
    }),
  
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
}

module.exports ={
    pagination,  
    findActivity,
    sorting,
    filtering,
    changePage,
    posting,
    milesFormat,
    arrayDropSelect,
    customStyles,
}
