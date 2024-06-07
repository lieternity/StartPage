// 编码 Unicode 字符到 Base64
export function encodeBase64Unicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

// 解码 Base64 到 Unicode 字符
export function decodeBase64Unicode(encodedStr) {
    return decodeURIComponent(atob(encodedStr).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

// 编码数据到 Base64
export function encodeDataToBase64(data) {
    const jsonStr = JSON.stringify(data);
    return encodeBase64Unicode(jsonStr);
}

// 解码 Base64 到数据
export function decodeBase64ToData(encodedStr) {
    const decodedStr = decodeBase64Unicode(encodedStr);
    return JSON.parse(decodedStr);
}
