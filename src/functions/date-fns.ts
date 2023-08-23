const formatString = () => 'dd/MM/YYYY HH:mm';

const getISODate = (date: Date): string => {
    return date.toISOString().slice(0, 19);
}

const getTomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
}

const getOneYearFromNow = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date;
}

const getISODateNow = () => getISODate(new Date());

const getISODateTomorrow = () => getISODate(getTomorrow());

const getISODateOneYearFromNow = () => getISODate(getOneYearFromNow());

export default {
    formatString,
    getISODateNow,
    getISODateTomorrow,
    getISODateOneYearFromNow
}