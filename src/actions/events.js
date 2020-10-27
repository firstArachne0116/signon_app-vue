import idb from '../indexedDB'
import {getCompetitors} from './competitors'

export const deleteEvent = async (context, info) => {
    await idb.deleteEvent(info)
}
export const getEvents = async (context) => {
    getCompetitors(context).then( async () => {
        let events = await idb.getEvents()
        context.state.events = []
        events.forEach(c => {
            c.results = context.state.competitors.filter( co => co.eventID == c.id && co.position != '' ).length
            context.state.events.push(c)
        })
    })
}
export const saveEvent = async (context, event) => {
    if (context.state.events.filter(ev => ev.eventName == event.eventName).length) return 0
    await idb.saveEvent(event)
    return 1
}
export const updateEvent = async (context, event, key) => {
    if (context.state.events.filter(ev => ev.eventName == event.eventName && ev.id != event.id).length) return 0
    await idb.updateEvent(event, key)
    return 1
}