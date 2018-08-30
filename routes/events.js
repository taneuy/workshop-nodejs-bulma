const router = require('express').Router()
const Event = require('../models/event')

router.get('/', (req, res) => {
  // new Event({
  //   name: 'My Event Name',
  //   description: 'My Description',
  //   location: 'Over on rainbow',
  // }).save()
  Event.find({}).then(function(data){
  res.render('events/list', {events: data})
}).catch(function(data){
  res.render('test')
})
})

router.get('/events/new', (req, res) => {
  res.render('events/new')
})

router.get('/events/:id', (req, res) => {
  const id = req.params.id
  Event.findById(id).then(function(event){
    res.render('events/detail', {event})
})
})
router.get('/events/:id/edit', (req, res) => {
  const { id } = req.params
 // const event = Event.findById(id)  
  Event.findById(id).then(function(event){
    res.render('events/edit', {event})
})
 // res.render('events/edit', {event})
})

// router.put('/events/:id')
router.post('/events/:id', async (req, res) => {
  // TODO
    const { id } = req.params
    const updated = { $set: req.body }
   // const options = {new: true}
    Event.findByIdAndUpdate(id, updated).then(function(data){
      res.redirect('/events/'+ id)
    }).catch (function(err) {
  res.render('error')
  })
})

router.post('/events', async (req, res) => {
  // TODO
  try {
    //new Event(payload).save().then(function(data)){res.redirect('/')}
    const event = new Event(req.body)
    await event.save()
    res.redirect(`/events/${event._id}`)
    } catch (err) {
    res.status(400).send('error')
    }
})

router.delete('/events/:id', async (req, res) => {
  // TODO
  // try {
  //   const { id } = req.params
  //   await Event.findByIdAndRemove(id)
  //   res.json({})
  //   } catch (err) {
  //   res.render
  //   }
  const {id} = req.params
  const success = function(data){}
  const error = function(error){}
  Event.findByIdAndRemove(id).then(success).catch(error)

  res.json({message: 'Delete'})
})

module.exports = router
