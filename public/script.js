const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const serverNotLoading = document.getElementById('not-loading');
const notLoadingBigFont = document.getElementById('not-loading-bigFont');
const notLoadingSmallFont = document.getElementById('not-loading-smallFont');
var errCount = 0; 

function exitApp() {
    loader.hidden = true;
    notLoadingBigFont.innerText = 'OOPS!'
    notLoadingSmallFont.innerText = `Something is wrong \r \n Please try after a while` 
    serverNotLoading.classList.add('quote-container');
}

// Show loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function removeLoadingSpinner() {
        quoteContainer.hidden = false;
        loader.hidden = true;
}

// Get Quote from API
async function getQuote() {
    showLoadingSpinner();
    const quoteURL = "https://quote-proxy.anusha.dev/quote"
    try {
        const response = await fetch(quoteURL);
        const data = await response.json();
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        //Stop Loader, show quote
        removeLoadingSpinner();
    }
    catch(err) {
        errCount = errCount + 1;
        if (errCount < 5) {
            getQuote();
        }
        else {
            exitApp();
        }
        
    }
}

//Tweet the Quote
function TweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners
twitterBtn.addEventListener('click', TweetQuote);
newQuote.addEventListener('click', getQuote);

// On load
getQuote();
