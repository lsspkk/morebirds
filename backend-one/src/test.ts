const axios = require('axios').default
const cheerio = require('cheerio')
const fs = require('fs')

async function getHtml() {
  const html = await axios.get('https://www.tiira.fi/index.php?toiminto=21&id=3613&sivu=0', {
    responseType: 'arraybuffer',
    reponseEncoding: 'binary',
  })
  return html.data.toString('latin1')
}

function readFile(fileName: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, (err: any, data: string) => {
      if (err) reject(err)
      resolve(data.toString())
    })
  })
}

async function printHtml() {
  const html = await getHtml()
  console.log(html)
}

interface Bird {
  name?: string
  date?: string
  location?: string
  amount?: number
}
async function scrape(html: string, verbose = false) {
  const sc = cheerio.load(html)
  const rows = sc('.havaintolistaus tr')

  const birds: Bird[] = []
  rows.each((rowNumber: number, tr: any) => {
    const bird: Bird = {}
    sc(tr)
      .find('td')
      .each((i: number, td: any) => {
        if (i === 3) {
          bird['name'] = sc(td).text().trim().split(' x ')[0].split('\t\t')[0]
        }
        if (i === 4) {
          bird['date'] = sc(td).text().trim()
        }
        if (i === 5) {
          bird['location'] = sc(td).text().trim()
        }
        if (i === 7) {
          bird['amount'] = sc(td).text().trim()
        }
        if (verbose) {
          console.log(rowNumber, i, sc(td)?.text()?.trim())
        }
      })

    birds.push(bird)
  })
  console.log(birds)
}

/*

 node test get-html  > somefile.html
 node test read-file somefile.html

*/
var args = process.argv.slice(2)
if (args[0] == 'get-html') {
  printHtml()
} else if (args[0] == 'read-file') {
  readFile(args[1]).then((html) => scrape(html, true))
} else {
  getHtml().then((html) => scrape(html))
}
