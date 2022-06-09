const appendImage = (countryName,section) => {
    let newImg = document.createElement("img")
    newImg.id = countryName + 'img'
    document.getElementById(section).appendChild(newImg)
}

const appendPopulation = (countryName,section) => {
    let newPop = document.createElement('p')
    newPop.id = countryName + 'pop'
    document.getElementById(section).appendChild(newPop)
}

const appendName = (countryName,section) => {
    let newName = document.createElement('p')
    newName.id = countryName + 'name'
    document.getElementById(section).appendChild(newName)
}

const getCountryByName = (countryName) => {
    appendImage(countryName,'top')
    fetch("https://restcountries.com/v2/name/" + countryName)
    .then(response => response.json())
    .then(data => document.getElementById(countryName + 'img').src = data[0].flag)
}

const getPopulationByName = (countryName) => {
    appendPopulation(countryName,'top')
    fetch("https://restcountries.com/v2/name/" + countryName)
    .then(response => response.json())
    .then(data => document.getElementById(countryName + 'pop').innerText = countryName + " population: " + data[0].population)
}

const getAllCountries = () => {
    fetch("https://restcountries.com/v2/all")
    .then(response => response.json())
    .then(data => {for(let i = 0; i<data.length; i++){
        appendName(data[i].name,'all')
        document.getElementById(data[i].name+'name').innerText = data[i].name
        appendPopulation(data[i].name, 'all')
        document.getElementById(data[i].name+'pop').innerText = data[i].population
        if(i >= data.length-1){
            document.querySelector('header').innerHTML = ""
        }
    }})
}




let countries = []

const getInputCountry = () => {
    let countryName = document.getElementById("countryname").value
    console.log(countryName);
    if(countries.includes(countryName)){
        document.querySelector('header').innerHTML = '<h1>INVALID COUNTRY</h1>'
        window.alert("duplicate country")
    } else {
        countries.push(countryName)
        getCountryByName(countryName);
        getPopulationByName(countryName)
    }
}

document.getElementById('enter').addEventListener('click', getInputCountry)

getAllCountries()