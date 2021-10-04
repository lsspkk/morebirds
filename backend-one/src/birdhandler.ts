import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
const axios = require('axios').default
const cheerio = require('cheerio')

var body: string | undefined = undefined

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  if (event.httpMethod === 'GET') {
    if (event.path === '/') {
      console.log('cache available:', body !== undefined)
      body = body !== undefined ? body : await getHtml().then((html) => scrape(html))
      return {
        body: String(body),
        statusCode: 200,
      }
    } else {
      return {
        body: 'pong',
        statusCode: 200,
      }
    }
  } else {
    return {
      statusCode: 400,
      body: 'Use GET',
    }
  }
}

async function getHtml() {
  const html = await axios.get('https://www.tiira.fi/index.php?toiminto=21&id=3613&sivu=0', {
    responseType: 'arraybuffer',
    reponseEncoding: 'binary',
    timeout: 1000,
  })
  return html.data.toString('latin1')
}

interface Bird {
  name?: string
  date?: string
  location?: string
  amount?: number
}
function scrape(html: string, verbose = false) {
  const sc = cheerio.load(html)
  const rows = sc('.havaintolistaus tr')

  const birds: Bird[] = []
  rows.each((rowNumber: number, tr: any) => {
    if (rowNumber === 0) {
      return
    }
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
  return JSON.stringify(birds)
}
