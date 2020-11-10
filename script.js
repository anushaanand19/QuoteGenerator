async function getQuote() {
    const proxyURL = "https://thawing-waters-72441.herokuapp.com/"
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch(proxyURL + apiUrl);
        const data = await response.json();
        console.log(data);
    }
    catch(err) {
        console.log(err);
    }
}

// On load
getQuote();