
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
	return http(path, data, "GET", true)
}


/**
 * Makes an HTTP PUT request to the API
 * @author Cameron Arnold
 * @param {string} path API model path (eg. "register", "login", etc)
 * @param {object} data Body of the request
 * @return {object}     Response from API
 */
export function putHTTP(path, data={}) {
	return http(path, data, "PUT")
}



/**
 * Makes an HTTP DELETE request to the API
 * @author Cameron Arnold
 * @param {string} path API model path (eg. "register", "login", etc)
 * @param {object} data Body of the request
 * @return {object}     Response from API
 */
export function deleteHTTP(path, data={}) {
	return http(path, data, "DELETE")
}



/**
 * Makes an HTTP request to the API using the provided method
 * @author Cameron Arnold
 * @param {string} path   API model path (eg. "register", "login", etc)
 * @param {object} data   Body of the request
 * @param {string} method Method type (eg. "POST", "GET", etc)
 * @return {object}       Response from API
 */
function http(path, data, method, isURLEncoded=false) {

	let url = process.env.REACT_APP_API_ROOT + path
	
	return new Promise(function (resolve, reject) {

		// Build headers
		let headers = {
			'Content-type': 'application/json'
		}

		if ('token' in localStorage) {
			headers['Authorization'] = 'Bearer ' + localStorage.token
			headers['Accept'] = 'application/json'
		}

		// Build payload
		let payload = {
			method: method
		}

		if (isURLEncoded) {
			const params = new URLSearchParams(data).toString();
			if (params)
				url += "?" + params
		}

		else {
			let params = JSON.parse(JSON.stringify(data))
			Object.keys(params).forEach(key => {
				if (typeof params[key] == 'object')
					params[key] = JSON.stringify(params[key])
			})

			payload.body = JSON.stringify(params)
		}


		// Finally set headers
		payload.headers = new Headers(headers)


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

