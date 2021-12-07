const fs = require('fs').promises;
const arguments = process.argv.slice(2)

// fa una copia dell'oggetto che si trova dentro data.json 
// (l'oggetto su data.json è stato inizialmente solo inizializzato scrivendo {"list: []"})
const data = require('./data.json')

// pushamo il nostro nuovo oggetto
data.list.push({
    prodotto: arguments[0], 
    quantità: arguments[1] 
})

// andiamo a ciclare per tutti gli elementi del file json usiamo \n su join per andare a capo quando scrive su html
const htmlList = data.list.map((el) => ` <li>${el.prodotto} - ${el.quantità}</li>`).join("\n")

// andiamo a scrivere con il template string del nostro html

const htmlContent = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<ul>
${htmlList}
</ul>  
</body>
</html>`

// creiamo la funzione per stampare 

async function printToHtml () {
    const newData =JSON.stringify(data) // rapprensenta data sotto forma di stringa
    await fs.writeFile('./data.json', newData)
    await fs.writeFile('./index.html', htmlContent)
}
//richiamiamo la funzione
printToHtml()

