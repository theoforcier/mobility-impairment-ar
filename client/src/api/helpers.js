
/**
 * Makes an HTTP POST request to the API
 * @author Cameron Arnold
 * @param {string} path API model path (eg. "register", "login", etc)
 * @param {object} data Body of the request
 * @return {object}     Response from API
 */

function postHTTP(path, data) {
	return http(path, data, "POST")
}


/**
 * Makes an HTTP GET request to the API
 * @author Cameron Arnold
 * @param {string} path API model path (eg. "register", "login", etc)
 * @param {object} data Body of the request
 * @return {object}     Response from API
 */
function getHTTP(path, data) {
	
	return http(path, data, "GET")
}


/**
 * Makes an HTTP request to the API using the provided method
 * @author Cameron Arnold
 * @param {string} path   API model path (eg. "register", "login", etc)
 * @param {object} data   Body of the request
 * @param {string} method Method type (eg. "POST", "GET", etc)
 * @return {object}       Response from API
 */
function http(path, data, method) {
	
	let url = process.env.REACT_APP_API_ROOT + path

	return new Promise(function (resolve, reject) {

		let headers = {
			'Content-type': 'application/json'
		}

		if ('token' in localStorage)
			headers['Authorization'] = 'Bearer ' + localStorage.token

		let payload = JSON.parse(JSON.stringify(data))

		for (let key in payload) {
			if (typeof payload[key] == "object")
				payload[key] = JSON.stringify(payload[key])
		}

		fetch(url, {
			method: method,
			//credentials: 'include',
			//mode: "cors",
			headers: new Headers(headers),
			body: JSON.stringify(payload)
		})
			.then(function(response){
				if (response.ok)
					return response.json();
			})
			.catch(e => {
				reject(e)
			})
			.then(function(j){
				resolve(j)
			})
	})
}


/*

Example run:

let payload = {
	'name': 'Cam',
	'password': '1234',
	'c_password': '1234',
	'email': '32324awd23324dwadwa3@gmail.com'
}

getHTTP('register', payload).then(response => {
	console.log(response)
})

*/
