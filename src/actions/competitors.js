import idb from '../indexedDB'

export const deleteCompetitor = async (context, info) => {
    await idb.deleteCompetitor(info)
}
export const getCompetitors = async (context) => {
    let competitors = await idb.getCompetitors()
    context.state.competitors = []
    competitors.forEach(c => {
        context.state.competitors.push(c)
    })
}
export const saveCompetitor = async (context, competitor) => {
    if (context.state.competitors.find(ev => ev.licenseNumber == competitor.licenseNumber && ev.eventID == competitor.eventID)) return 0
    await idb.saveCompetitor(competitor)
    return 1
}
export const updateCompetitor = async (context, competitor, key) => {
    await idb.updateCompetitor(competitor, key)
}
export const getCompetitorsByEventID = async(context, eventID) => {
    await getCompetitors(context)
    return context.state.competitors.filter( c => c.eventID == eventID )
}