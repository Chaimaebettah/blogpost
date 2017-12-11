export const classes = (...params) => params.filter(param => typeof param === 'string').join(' ');



export const convertedTimeStamp = (timeStamp) => {
    let date = new Date(timeStamp);
    return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
};