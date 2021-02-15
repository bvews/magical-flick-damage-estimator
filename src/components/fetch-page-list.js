export function fetchPages(callback) {
    fetchJson('/pages.json', function (json) {
        callback(json);
    });
}

export function fetchTools(callback) {
    fetchJson('/pages.json', function (json) {
        callback(json.tools);
    });
}

export function fetchMemos(callback) {
    fetchJson('/pages.json', function (json) {
        callback(json.memos);
    });
}

function fetchJson(url, callback) {
    const xhr = new XMLHttpRequest();
    const date = new Date().toLocaleDateString().replace(/\//g, '');
    xhr.open('GET', url + '?v=' + date);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const data = JSON.parse(xhr.responseText);
                addTitleProperty(data.tools);
                addTitleProperty(data.memos);
                callback(data);
            } catch (error) {
                callback({});
            }
        }
    };
    xhr.send();
}

function addTitleProperty(items) {
    items.forEach(function (item) {
        item.title = item.text;
    });
}
