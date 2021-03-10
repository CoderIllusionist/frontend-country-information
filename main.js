async function getCountrybyName(country) {
    try { const response = await axios.get('https://restcountries.eu/rest/v2/name/' + country); return response; } catch (error) { console.error(error); }
}

async function getAllCountries(country) {
    try { const response = await axios.get('https://restcountries.eu/rest/v2/all'); return response; } catch (error) { console.error(error); }
}

function addCountriesToArray(response) {
    let array = []; for (let i = 0; i < response.data.length; i++) { array.push(response.data[i]['name']) } return array;
};

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
};

function stringBuilderSituated(x, y, z) { return `${x} is situated in ${y}. It has a population of ${z} people.` };

function stringBuilderCapital(x) { return `The capital is ${x}` };


function stringBuilderLanguages(languages) {
    let countries = 'They speak ';
    for (let i = 0; i < languages.length; i++) {
        if (i + 1 == languages.length && languages.length != 1) {
            countries = countries + "and " + languages[i].name + "." + "\n";
        } else if (i + 2 == languages.length) {
            countries = countries + languages[i].name + " ";
        } else if (languages.length == 1) {
            countries = countries + languages[i].name + ".";
        } else {
            countries = countries + languages[i].name + ", ";
        }
    }
    return countries
}

function stringBuilderCurrencies(currencies) {
    let currency = ' and you can pay with ';
    for (let i = 0; i < currencies.length; i++) {
        if (i + 1 == currencies.length && currencies.length != 1) {
            currency = `${currency}` + "'s " + "and " + currencies[i].name + "'s" + ".";
        } else if (i + 2 == currencies.length) {
            currency = currency + currencies[i].name;
        } else if (currencies.length == 1) {
            currency = currency + currencies[i].name + "'s" + ".";
        } else {
            currency = currency + currencies[i].name + "'s" + ", ";
        }
    }
    return currency;
}


getAllCountries().then(function (result) {
    const arrayCountryNames = addCountriesToArray(result)
    var str = ''; // variable to store the options
    arrayCountryNames.forEach(element => str += '<option value="' + element + '" />');
    var my_list = document.getElementById("country");
    my_list.innerHTML = str;
})

function onSelectCountry() {
    var val = document.getElementById("countries").value;
    var opts = document.getElementById('country').childNodes;
    for (let i = 0; i < opts.length; i++) {
        if (opts[i].value === val) {
            getCountrybyName(opts[i].value).then(function (result) {
                clearInput();
                const values = returnValues(result);
                const currencies = values[4]
                const languages = values[5];
                const situated = stringBuilderSituated(values[0], values[1], values[2]);
                const capital = stringBuilderCapital(values[3]) + stringBuilderCurrencies(currencies);

                const speaks = stringBuilderLanguages(languages);
                const flagURL = values[6];
                const responseBox = document.querySelector('.response-box');
                responseBox.style.visibility = 'visible';
                flagController(flagURL,values[0]);
                createElement("h2", values[0]);
                createElement("h3", situated);
                createElement("h4", capital);
                createElement("h5", speaks);
            })
            break;
        }

    }
}

let counter = 0
function flagController(url, country) {
    if (counter == 1 || counter > 1) { let oldFlag = document.getElementById('flag'); oldFlag.remove(); }
    counter++;
    var x = document.createElement("IMG");
    x.setAttribute("src", url);
    x.setAttribute("id", 'flag');
    x.setAttribute("width", "304");
    x.setAttribute("height", "228");
    x.setAttribute("alt", `The flag of ${country}`);
    const countryContainer = document.getElementById('country-flag-name')
    countryContainer.append(x);
}

let elementCounter = 0;

function createElement(element, text) {
    if (elementCounter == 1 || elementCounter > 1) { removeElement(element); } // Remove element if it exists.
    elementCounter++;
    if (element == 'h2') {
        const countryContainer = document.getElementById('country-flag-name');
        element = document.createElement(element);
        text = document.createTextNode(text);
        element.appendChild(text);
        countryContainer.append(element);
        return;
    }
    const countryInformationContainer = document.getElementById('country-information');

    element = document.createElement(element);
    text = document.createTextNode(text);
    element.appendChild(text);
    countryInformationContainer.append(element);
}

function removeElement(element) {
    var element = document.getElementsByTagName(element), index;
    for (index = element.length - 1; index >= 0; index--) { element[index].parentNode.removeChild(element[index]); }
}

function clearInput() { setTimeout(() =>{document.getElementById('countries').value = '' }, 1000); }