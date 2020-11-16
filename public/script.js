const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const serverNotLoading = document.getElementById('not-loading');
const notLoadingBigFont = document.getElementById('not-loading-bigFont');
const notLoadingSmallFont = document.getElementById('not-loading-smallFont');
const tryAgainBtn = document.getElementById('try-again');
var errCount = 0;
serverNotLoading.hidden = true;

// Show error msg, when the server is down
function showErrorMessage() {
    loader.hidden = true;
    serverNotLoading.hidden = false;
    notLoadingBigFont.innerText = 'OOPS!'
    notLoadingSmallFont.innerText = `Something went wrong\r \n`
    tryAgainBtn.innerText = "Try again"
}

// When the values are obtained, hide the error message
function hideErrorMessage() { 
    serverNotLoading.hidden = true;
    errCount = 0;
}

// Show loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
    serverNotLoading.hidden = true;
}

//Hide Loading
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;}
        
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
        //Hide the error message 
        hideErrorMessage();
    }
    catch(err) {
        errCount = errCount + 1;
        if (errCount < 5) {
            getQuote();
        }
        else {
            //Show that the server is not reachable, to try again
            showErrorMessage();
        }
        
    }
}

//Tweet the Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuote.addEventListener('click', getQuote);
tryAgainBtn.addEventListener('click', getQuote);


// On load
getQuote();
