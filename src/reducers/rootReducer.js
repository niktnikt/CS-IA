import { element } from "prop-types";

const initState = {
    user: null,
    events: null,
    users: null
}

const rootReducer = (state = initState, action) => {
    if(action.type === 'GET_USER'){
        return{
            ...state,
            user: action.user
        }
    }else if(action.type === 'LOGOUT_USER'){
        return{
            ...state,
            user: false
        }
    }else if(action.type === 'FETCH_EVENTS'){
        return{
            ...state,
            events: action.events
        }
    }else if(action.type === 'ADD_EVENT'){
        let editEvents = [...state.events];
        editEvents.push(action.event)
        return{
            ...state,
            events: editEvents
        }
    }else if(action.type === 'UPDATE_EVENT'){
        let editEvents =[...state.events];
        const eventDates = editEvents.map((event) => {return event.date})
        const index = eventDates.indexOf(action.event.date);
        editEvents[index] = action.event;
        return{
            ...state,
            events: editEvents
        }
    }else if(action.type === 'DELETE_EVENT'){
        let editEvents = [...state.events];
        const eventDates = editEvents.map((event) => {return event.date});
        const index = eventDates.indexOf(action.event.date);
        editEvents.splice(index, 1);
        return{
            ...state,
            events: editEvents
        }
    }else if(action.type === 'BOOK_EVENT'){
        //add booked event to user's list of booked events
        let editUser = JSON.parse(JSON.stringify(state.user)) //creates deep copy of user
        editUser.events.push(action.event);
        //swap this updated event (has one more user in its list) with the old one
        let editEvents = [...state.events];
        const eventDates = editEvents.map((event) => {return event.date});
        const index = eventDates.indexOf(action.event.date) 
        editEvents[index] = action.event
        return{
            ...state,
            user: editUser,
            events: editEvents
        }
    }else if(action.type === 'UNBOOK_EVENT'){
        //remove event from user's list of booked events
        let editUser = JSON.parse(JSON.stringify(state.user));
        const userEventsDates = editUser.events.map((event) => {return event.date});
        const index = userEventsDates.indexOf(action.event.date);
        editUser.events.splice(index, 1);

        //swap this updated event (has the user who unbooked, removed from the list of users) with the old one
        let editEvents = [...state.events];
        const eventDates = editEvents.map((event) => {return event.date});
        const eventIndex = eventDates.indexOf(action.event.date);
        editEvents[eventIndex] = action.event;

        return{
            ...state,
            user: editUser,
            events: editEvents
        }
    }else if(action.type === 'FETCH_USERS'){
        return{
            ...state,
            users: action.users
        }
    }
    return state
}

export default rootReducer;