
/**
 * Makes an HTTP POST request to the API
 * @author Cameron Arnold
 * @param {string} path API model path (eg. "register", "login", etc)
 * @param {object} data Body of the request
 * @return {object}     Response from API
 */
export function postHTTP(path, data={}) {
	return http(path, data, "POST")
}


/**
 * Makes an HTTP GET request to the API
 * @author Cameron Arnold
 * @param {string} path API model path (eg. "register", "login", etc)
 * @param {object} data Body of the request
 * @return {object}     Response from API
 */
export function getHTTP(path, data={}) {	
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

		// Build headers
		let headers = {
			'Content-type': 'application/json'
		}

		if ('token' in localStorage)
			headers['Authorization'] = 'Bearer ' + localStorage.token

		// Build fetch payload
		let payload = {
			method: method,
			headers: new Headers(headers),
			//credentials: 'include',
			//mode: "cors"
		}

		// Include user-provided parameters
		if (method == "GET") {
			let params = new URLSearchParams(obj).toString();
			if (params)
				url += "?" + params

		} else {
			let params = JSON.parse(JSON.stringify(data))

			for (let key in params) {
				if (typeof params[key] == "object")
					params[key] = JSON.stringify(params[key])
			}

			payload.body = params
		}

		// Send fetch request, and return result
		fetch(url, payload)
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

postHTTP('register', payload).then(response => {
	console.log(response)
})

*/
