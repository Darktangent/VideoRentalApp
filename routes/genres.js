const express=require('express')
const router=express.Router()


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


router.get('/', (req, res) => {
    res.send(genres)
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema)
}

router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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


router.get('/:id', (req, res) => {

    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('not found')
    res.send(genre)


})







module.exports=router