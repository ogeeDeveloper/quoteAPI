const path = require('path')
const fs = require('fs')
const vaxic = require('vaxic')
const quotesFile = fs.readFileSync(path.join(__dirname, 'quote.txt')).toString();
const quotes = []

//Execute each line of the quotes in the quote.txt file
quotesFile.split('\n').forEach(line=>{
	const lineParse = line.split('---')

	//Add all quotes to the array
	quotes.push({
		'quote': lineParse[0],
		'by' : lineParse[1]
	})
})



	

const app = new vaxic()
const port = 3000;

//Endpoint 
app.add('GET', '/api/quote', (req, res)=>{
	res.writeHead(200, {
		'Content-Type' : 'application/json'
	})

	//randomly calling quotes from the quote array
	const randomQuote = quotes[Math.floor(Math.random()* quotes.length)]
	res.end(JSON.stringify(randomQuote))
})

app.add((req, res)=>{
	res.writeHead(404,{
		'Content-Type' : 'application/json'
	})
	res.end(JSON.stringify({
		'error' : 'Resource not found' 
	}))
})

app.listen(port, ()=>{
	console.log(`Application started on port ${port}`)
})