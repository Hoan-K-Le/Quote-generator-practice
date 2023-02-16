// DOM Manipulation grabbing Elements
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [] // So it is available to all function

// Show Loading
function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false
  loader.hidden = true
}

// Show new Quote
function newQuote() {
  loading()
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  // Check if Author field is blank and replace it with Unkown
  if (!quote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author
  }

  // Check quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }

  // Set Quote, Hide loader
  quoteText.textContent = quote.text
  complete()
}

// Grab the Quote's from an API
async function getQuotes() {
  loading()
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'

  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (err) {
    console.log('FIREEEE ERROR', err)
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes()
loading()
