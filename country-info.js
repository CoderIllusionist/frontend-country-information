async function getAllCountries() {
    try {
        const response = await axios.get('https://restcountries.eu/rest/v2/all');
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function getCountrybyName(country) {
    try {
        const response = await axios.get('https://restcountries.eu/rest/v2/name/' + country);
        return response;
    } catch (error) {
        console.error(error);
    }
}
function returnValues(response) {
    const countryName = response.data[0]['name'];
    const subRegion = response.data[0]['subregion'];
    const population = response.data[0]['population'];
    const capital = response.data[0]['capital'];
    const currencies = response.data[0]['currencies'];
    const languages = response.data[0]['languages'];
    const flag = response.data[0]['flag'];

    const arrayInfo = [countryName, subRegion, population, capital, currencies, languages, flag];
    return arrayInfo;
}

function addCountriesToArray(response) {
    let array = [];
    for (let i = 0; i < response.data.length; i++) {
        let name = response.data[i]['name'];
        let flag = response.data[i]['flag'];
        let region = response.data[i]['region'];
        array.push({name, flag, region})
    }
    return array;
};

function checkRegion(region, div) {
    if (region === 'Asia') { return div.classList.add('asia') }
    if (region === 'Americas') { return div.classList.add('americas') }
    if (region === 'Europe') { return div.classList.add('europe') }
    if (region === 'Africa') { return div.classList.add('africa') }
    if (region === 'Oceania') { return div.classList.add('oceania') }
    else { return div.classList.add('oceania') }
}

getAllCountries().then(function (result) {
    const arrayCountryNames = addCountriesToArray(result);
    for (i = 0; i < arrayCountryNames.length; i++) {
        let div = document.createElement('div'); // create a <div> node
        let node = document.createElement("li");  // Create a <li> node
        let image = document.createElement('img') // create a <img> node
        node.setAttribute("onclick", "onCountryClick(this);");
        image.src = arrayCountryNames[i].flag; // set img src to the flag url
        let textnode = document.createTextNode(arrayCountryNames[i].name); // Create a text node
        div.appendChild(image);
        div.appendChild(node);
        node.appendChild(textnode)

        div.classList.add('country-item')
        checkRegion(arrayCountryNames[i].region, div)

        document.getElementById("listcountries").appendChild(div); ///append Item
    }
})

function onCountryClick(test) {
    document.getElementById('loading-icon').style.display = "unset";
    getCountrybyName(test.textContent).then(function (result) {
        document.getElementById('loading-icon').style.display = "none";
        const arrayCountryInformation = returnValues(result);
        const country = arrayCountryInformation[0]
        console.log(country)
    })
}