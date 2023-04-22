const DateHelper = {
    formatDate: (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
}
module.exports = DateHelper; 