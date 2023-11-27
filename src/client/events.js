import axios from "axios";

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * It makes a GET request to the endpoint `/topics` and returns the response data.
 * @returns  An array of objects.
 */
export async function getEvents() {
    const endpoint = `${baseApiEndpoint}/event`;

    const response = await axios.get(endpoint);        
    return response.data.data;
}

export async function editEvents(data) {
    const endpoint = `${baseApiEndpoint}/event/update`;

    const response = await axios.put(endpoint, data);
    return response.status;
}
