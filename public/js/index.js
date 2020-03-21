function sendRequest(url, options, jsonCallback) {
    fetch(url, options).then(response => {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.indexOf("application/json") !== -1) {
            response.json().then(jsonCallback)
        }
        else { //display error
            response.text().then(text => {
                document.body.innerHTML += "<p> Error: " + text + "</p>"
            })
        }
    })
}

files = []

function send() {
    const form = document.forms["baseForm"]

    const data = {
        firstname: form["fname"].value,
        lastname: form["lname"].value,
        files
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    sendRequest('/submitForm', options, data => { document.body.innerHTML += "<p> Entry ID: " + data.id + "</p>" })

    files = []
    return false //prevents reload
}

function sendFile() {
    const form = document.forms['fileForm']
    const file = form['file'].files[0];

    //create post data
    const formData = new FormData();
    formData.append("file", file);
    const options = {
        method: 'POST',
        body: formData
    }

    sendRequest('/submitFile', options, data => {
        data.description = form['description'].value
        files.push(data)
        document.body.innerHTML += "<p>Uploaded!</p>"
    })
    return false //prevents reload
}
