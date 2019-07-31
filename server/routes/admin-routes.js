const router = require('express').Router();
const Event = require('../models/Event-model');
const { check, validationResult } = require('express-validator/check'); //form validation
const User = require('../models/User-model');

router.get('/', async (req, res) => {
    //check if the user is really the admin
    if(!req.user.admin){
        return res.json({
            error: 'Access denied'
        })
    }

    const users = await User.find({}).populate('events');
    return res.json({
        users: users
    })

});

router.post('/create', [
    check('date').isISO8601().withMessage('Incorrect date format'),
    check('places').isInt({ min: 1}).withMessage('Number of places must be an integer')
], async (req, res) => {
    try{
        if(!req.user.admin){
            return res.json({
                error: 'Access denied'
            })
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                error: errors.array()[0].msg
            })
        }
    
        const eventExists = await Event.findOne({date: req.body.date}).populate('users');
        //if event already exists update it
        if(eventExists){
            eventExists.places = req.body.places;
            const savedEventExists = await eventExists.save();
            return res.json({
                eventUpdate: savedEventExists
            })
        }

        //if event doesn't exist create a new one
    
        const event = new Event({
            date: req.body.date,
            places: req.body.places
        })
    
        const savedEvent = await event.save()
        res.json({
            event: savedEvent
        })
    }catch(e){
        res.json({
            error: 'Sorry an error occured'
        })
    }

});

router.delete('/delete', async (req, res) => {
    try{
        if(!req.user.admin){
            return res.json({
                error: 'Access denied'
            })
        }
        const date = req.query.date;
        const event = await Event.findOne({date: date});
        console.log(event.users)
        for(let i = 0; i < event.users.length; i++){
            const user = await User.findOne(event.users[i]);
            const index = user.events.indexOf(event._id)
            user.events.splice(index, 1)
            await user.save()
        }
        const deleted = await Event.findOneAndRemove({date: date}); //if event doesn't exists deleted will be set to null
        return res.json({
            deletedEvent: deleted
        })
    }catch(e){
        console.log(e)
        return res.json({
            error: 'Sorry an error occured'
        })
    }
})

module.exports = router;