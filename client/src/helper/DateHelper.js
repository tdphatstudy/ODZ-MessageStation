const DateHelper = {
    formatDate: (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    },
    formatTime: (dateStr) => {
        const date = new Date(dateStr);
        const hour = date.getHours();
        const minus = date.getMinutes();
        const mili = date.getMilliseconds();
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        const formattedDate = `${hour}:${minus}:${mili} ${day}/${month}/${year}`;
        return formattedDate;
    }
}
module.exports = DateHelper; 