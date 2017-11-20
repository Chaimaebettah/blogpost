export const classes = (...params) => params.filter(param => typeof param === 'string').join(' ');
