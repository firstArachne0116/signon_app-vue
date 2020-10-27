import idb from '../indexedDB'

export const deleteInfo = async (context, info) => {
    await idb.deleteInfo(info)
}
export const getInfos = async (context) => {
    let infos = await idb.getInfos()
    context.state.infos = []
    infos.forEach(c => {
    context.state.infos.push(c)
    })
}
export const saveInfo = async (context, info) => {
    await idb.saveInfo(info)
}
export const updateInfo = async (context, info, key) => {
    await idb.updateInfo(info, key)
}