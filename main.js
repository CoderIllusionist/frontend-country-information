async function getCountrybyName(country) {
    try {
        const response = await axios.get('https://restcountries.eu/rest/v2/name/' + country);
        return response;
    } catch (error) {
        console.error(error);
    }
}

async function getAllCountries(country) {
    try {
        const response = await axios.get('https://restcountries.eu/rest/v2/all');
        return response;
    } catch (error) {
        console.error(error);
    }
}

function addCountriesToArray(response) {
    let array = [];
    for (let i = 0; i < response.data.length; i++) {
        array.push(response.data[i]['name'])
    }
    return array;
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

function stringBuilderSituated(x, y, z) {
    return `${x} is situated in ${y}. It has a population of ${z} people.`
}

function stringBuilderCapital(x) {
    return `The capital is ${x}`
}

function spokenLanguages(languages) {
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
                const values = returnValues(result);
                const languages = values[5];
                const situated = stringBuilderSituated(values[0], values[1], values[2]);
                const capital = stringBuilderCapital(values[3]);
                const speaks = spokenLanguages(languages)
                const flagURL = values[6]
                flagController(flagURL,values[0]);
            })
            break;
        }

    }
}

let counter = 0
function flagController(url, country) {
if (counter == 1 || counter > 1) {
    let oldFlag = document.getElementById('flag');
    oldFlag.remove();
}
    counter++
    var x = document.createElement("IMG");
    x.setAttribute("src", url);
    x.setAttribute("id", 'flag');
    x.setAttribute("width", "304");
    x.setAttribute("height", "228");
    x.setAttribute("alt", "The Pulpit Rock");
    document.body.appendChild(x);
}