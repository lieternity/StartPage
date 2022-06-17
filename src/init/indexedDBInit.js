export function indexedDBInit() {
    const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
        dbVersion = 2;
    if (!indexedDB) {
        alert("你的浏览器不支持IndexedDB");
    }
    var request = indexedDB.open('ImagesDB', dbVersion)
    var DB
    request.onerror = function (e) {
        console.log(e.currentTarget.error.message)
    }
    request.onupgradeneeded = function (e) {
        DB = e.target.result
        if (!DB.objectStoreNames.contains('VideoImages')) {
            DB.createObjectStore('VideoImages')
        }
    }

    request.onsuccess = function () {
        DB = request.result
        DB.onerror = function (e) {
            console.log(e.currentTarget.error.message)
        }
    }

}

document.addEventListener("keyup", (event) => {
    if (event.code === "F9") {
        let bgvideo = document.getElementById("videoBg")
        bgvideo.click()
        bgvideo.onchange = function (e) {
            const resultFile = e.target.files;
            console.log(`resultFile`, resultFile);
            if (resultFile.length) {
                console.log("上传成功");
                const aBlob = new Blob([resultFile[0]], {type: 'video/mp4'});
                putImageInDb(aBlob, "custom");
            } else {
                console.log("上传失败，使用默认视频");
                getImageFile();
            }
        }

    }
})

export function putImageInDb(DB, blob, key) {
    // 将blob 对象存储到数据库中
    var transaction = DB.transaction(['VideoImages'], 'readwrite');
    var put = transaction.objectStore('VideoImages').put(blob, key);
    // put.onsuccess = () => window.location.reload();
    put.onsuccess = () => alert("视频上传成功，刷新一下试试？");
}

export function getImageRequest(DB, key) {
    // 获取图片文件
    var transaction = DB.transaction(['VideoImages'], 'readwrite')
    transaction.objectStore('VideoImages').get(key).onsuccess = (event) => {
        // 异步回调
        let blob = event.target.result
        if (blob) {
            var url = window.URL.createObjectURL(blob);
            return url

        }
    }
}

export function getImageFile(url = "img/video.mp4") {
    console.log(url)
    var xhr = new XMLHttpRequest(),
        blob;

    xhr.open("GET", url, true);
    // Set the responseType to blob
    xhr.responseType = "blob";

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            console.log("Image retrieved");

            // Blob as response
            blob = xhr.response;
            console.log("Blob:" + blob);

            // Put the received blob into IndexedDB
            putImageInDb(blob, "custom")
        }
    }, false);
    // Send XHR
    xhr.send();
}
