/*
 * @Author: 叶有志 
 * @Date: 2019-10-05 00:59:22 
 * @Last Modified by: 叶有志
 * @Last Modified time: 2019-10-05 02:22:03
 */

const dateFormat = (timestamp) => {
    if(!timestamp) return;
    function checkVal(val) {
        let strVal = String(val)
        return strVal.length < 2 ? '0' + strVal : strVal;
    }
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    const dateArr = [year, month, day, hour, minute, seconds];
    const newDateArr = dateArr.map(item => {
        return checkVal(item)
    })
    
    return `${newDateArr.splice(0, 3).join('-')} ${newDateArr.splice(0, 3).join(':')}`;
}

export default dateFormat;
