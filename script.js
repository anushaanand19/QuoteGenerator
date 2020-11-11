async function getQuote() {
    const proxyURL = "https://cors-anywhere.herokuapp.com/"
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    try {
        const response = await fetch("./quote.json");
        const data = await response.json();
        console.log(data[0]);
    }
    catch(err) {
        console.log(err);
    }
}

// On load
getQuote();