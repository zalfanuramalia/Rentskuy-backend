const express = require ('express')

const app = express()

app.use(express.urlencoded({extended: true}))

app.listen(3000, ()=>{
    console.log('App running on port 3000')
})

const user = []

app.post('/vehicle', (req, res)=>{
    const item = {
        id: user.length + 1,
        merk: req.body.merk,
        plat: req.body.plat,
        color: req.body.color,
        year: req.body.year,
        status: req.body.status
    }
    user.push(item)

    return res.json({
        success: true,
        message: 'Data Input Success!'
    })
})

app.get('/user', (request, response)=>{
    return response.json({
        success: true,
        message: 'List Car',
        item: user
    })
})

app.delete('/delete/:id', (req, res)=>{
    const {id} = req.params
    const index = user.findIndex(val => val.id === parseInt(id))
    delete user[index]
    return res.json({
        success: true,
        message: 'Delete',
        data: user[index]
    })
})

app.patch('/user/:id', (req, res)=>{
    const dataID = req.params.id 
    const idx = user.findIndex(val => val.id === parseInt(dataID)) 
    user[idx].merk = req.body.merk
    user[idx].plat = req.body.plat
    user[idx].color = req.body.color
    user[idx].year = req.body.year
    return res.json({
        success: true,
        message: 'Update data',
        data: user[idx]
    })
})

