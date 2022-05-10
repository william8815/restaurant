const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting static files
app.use(express.static('public'))

// setting handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting routes
// index
app.get('/', (req, res) => {
  res.render('index', {
    list: restaurantList.results
  })
})
//show
app.get('/restaurants/:list_id', (req, res) => {
  const list = restaurantList.results.find(list => list.id.toString() === req.params.list_id)
  res.render('show', { list: list })
})
//search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const name = restaurantList.results.filter(list => (list.name + list.name_en).toLocaleLowerCase().includes(keyword.toLowerCase()))
  const category = restaurantList.results.filter(list => list.category.toLocaleLowerCase().includes(keyword.toLowerCase()))
  const data = name.length ? name : category
  res.render('index', {
    list: data,
    keyword: req.query.keyword
  })
})

// server listen
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})