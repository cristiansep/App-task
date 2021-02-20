import moment from 'moment';



export const prepareTasks = (tasks = []) => {

    return tasks.map(
        (t) => ({
            ...t,
            date: moment(t.date).toDate()
        })
    )
}