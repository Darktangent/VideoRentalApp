const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())

const genres = [{
        id: 1,
        name: "Action"
    },
    {
        id: 2,
        name: "Horror"
    },
    {
        id: 3,
        name: "Romance"
    }
]

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

app.post('/api/genres', (req, res) => {
    const result = validateGenre(req.body)
    if (result.error) return res.status(400).send(result.error[0].message)
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genre)
})
//genre update route
app.put('/api/genres/:id', (req, res) => {
    const {
        id
    } = req.body
    const genre = genres.find(g => g.id === parseInt(id))
    if (!genre) return res.status(404).send('The genre with that id was not found')
    const result = validateGenre(req.body)
    if (result.error) return res.status(400).send(result.error[0].message)
    genre.name = req.body.name
    res.send(genre)
})

app.delete('/api/genres/:id', (req, res) => {
    const {
        id
    } = req.body
    const genre = genres.find(g => g.id === parseInt(id))
    if (!genre) return res.status(404).send('The genre with that id was not found')
    const result = validateGenre(req.body)
    if (result.error) return res.status(400).send(result.error[0].message)
    const genreIndex = genres.indexOf(genre)
    genres.splice(genreIndex, 1)
    res.send(genre)

})


app.get('/api/genres/:id', (req, res) => {

    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('not found')
    res.send(genre)


})





const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`listening on ${port}...`)
})