const router = require('express').Router();
const Event = require('../models/Event-model');

router.post('/', async (req, res) => {
    if(!req.user){
        return res.json({
            error: 'Please log in'
        })
    }
    const event = await Event.findOne({date: req.body.date}).populate('users');
    const eventsId = req.user.events.map((e) => {return e._id.toString()})
    const index = eventsId.indexOf(event._id.toString())
    if(event && index === -1){
        //if there are not more places left don't allow event to be booked
        if(event.places <= event.users.length){
            return res.json({
                error: 'No more places left'
            })
        }
        //add event to current user's list of booked events
        req.user.events.push(event)
        const savedUser = await req.user.save();
        //add user to event's list of users
        event.users.push(req.user);
        const savedEvent = await event.save()

        return res.json({
            event: savedEvent
        })
    }else if(event && index > -1){
        //unbook an event
        req.user.events.splice(index, 1);
        const savedUser = await req.user.save();

        const usersId = event.users.map((user) => {return user._id.toString()});
        const userIndex = usersId.indexOf(req.user._id.toString());
        event.users.splice(userIndex, 1);
        const savedEvent = await event.save();

        return res.json({
            unbookedEvent: savedEvent
        })
    }
})

module.exports = router;