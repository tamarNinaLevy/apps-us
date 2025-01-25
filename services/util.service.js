export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people.', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story.', 'It', 'was', 'a pleasure', 'to', 'burn.']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

export function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

export function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}

export function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

export function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

export function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

export function formatDate(inputDate) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const date = new Date(inputDate);

    // Format: Jan 24, 2025
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Format: 12:28 PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    // Calculate the difference in days
    const timeDiff = Math.abs(now - date);
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const timeDescriptor = daysAgo === 0
        ? "today"
        : daysAgo === 1
            ? "yesterday"
            : `${daysAgo} days ago`;

    return `${month} ${day}, ${year}, ${hours}:${minutes} ${period} (${timeDescriptor})`;
}