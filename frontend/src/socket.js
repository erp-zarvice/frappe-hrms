import { io } from "socket.io-client"
// import { socketio_port } from "../../../../sites/common_site_config.json"

import { getCachedListResource } from "frappe-ui/src/resources/listResource"
import { getCachedResource } from "frappe-ui/src/resources/resources"

// Fallback socketio port configuration
let socketio_port = 9000; // Default socketio port

// Try to get socketio_port from window or fallback
try {
	if (window.socketio_port) {
		socketio_port = window.socketio_port;
	}
} catch (e) {
	// Fallback to default port
}

export function initSocket() {
	let host = window.location.hostname
	let siteName = window.site_name
	let port = window.location.port ? `:${socketio_port}` : ""
	let protocol = port ? "http" : "https"
	let url = `${protocol}://${host}${port}/${siteName}`
	let socket = io(url, {
		withCredentials: true,
		reconnectionAttempts: 5,
	})

	socket.on("hrms:refetch_resource", (data) => {
		if (data.cache_key) {
			let resource =
				getCachedResource(data.cache_key) ||
				getCachedListResource(data.cache_key)

			if (resource) {
				resource.reload()
			}
		}
	})

	return socket
}
