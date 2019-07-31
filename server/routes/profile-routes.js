const router = require('express').Router();
const Event = require('../models/Event-model');
const User = require('../models/User-model');

router.post('/', async (req, res) => {
    try{
        const id = req.body.id;
        const event = await Event.findById(id);
        const index = req.user.events.indexOf(id);
        req.user.events.splice(index, 1);
        const savedUser = await req.user.save();
        const eventIndex = event.users.indexOf(req.user._id)
        event.users.splice(eventIndex, 1);
        const savedEvent = await event.save()
        return res.json({
            user: savedUser,
            event: savedEvent
        })
    }catch(e){
        console.log(e)
        return res.json({
            error: 'Sorry an error occured'
        })
    }
})

module.exports = router;