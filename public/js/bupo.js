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

function read() {
    const form = document.forms["request"]
    const data = {
        id: form["id"].value,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    sendRequest('/readForm', options, data => {
        const output = document.createElement("div")
        output.innerHTML += "<p> Firstname: " + data.firstname + "</p>"
        output.innerHTML += "<p> Lastname: " + data.lastname + "</p>"
        for (f of data.files) {
            if (f.type.indexOf("image") != -1)
                output.innerHTML += '<img src="getFile/' + f.fileID + "/>"
            else {
                let description = ""
                if (f.description)
                    description = '<label for="button">' + f.description + '</label>'
                output.innerHTML += '<form action="getFile/' + f.fileID + '">' + description + '<input type="submit" name="button" value="Download"/></form>'
            }
        }
        document.body.appendChild(output)
    })
    return false //prevents reload
}