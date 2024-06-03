export function formatTime(timestamp) {
    let date = new Date(timestamp * 1000); // 注意：JavaScript中的时间戳是以毫秒为单位的，而Unix时间戳通常是以秒为单位的，所以这里需要乘以1000
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份从0开始，需要加1，然后确保两位数显示
    let day = ('0' + date.getDate()).slice(-2); // 确保两位数显示
    let hours = ('0' + date.getHours()).slice(-2); // 确保两位数显示
    let minutes = ('0' + date.getMinutes()).slice(-2); // 确保两位数显示
    let seconds = ('0' + date.getSeconds()).slice(-2); // 确保两位数显示
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
