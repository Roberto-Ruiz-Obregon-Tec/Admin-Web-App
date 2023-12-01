import axios from 'axios';

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * This function gets all information
 */
export async function getInformation() {
    const endpoint = `${baseApiEndpoint}/informacion-fundacion`;

    const response = await axios.get(endpoint);
    return response.data.data.info;
}

/**
 * This function updates the information
 */
export async function updateInformation(body) {
    const endpoint = `${baseApiEndpoint}/informacion-fundacion/update`;

    const response = await axios.put(endpoint, body);
    return response.data;
}