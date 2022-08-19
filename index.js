import app from './app'

async function main () {
  // const root = parse('<ul id="list"><li>Hello World</li></ul>')
  // console.log(root.querySelector('li').rawText)

  app.listen(app.get('port'))
  console.log(`Server on port http://localhost:${app.get('port')}`)
}
main()
