

module.exports = {
    isValidNumber: function (n){
        if(typeof n == 'number' && Number.isNaN(n)) {
            return false;
        }
        if(typeof n != 'number') {
            return false;
        }
        return true;
    }
};
