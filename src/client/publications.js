import axios from "axios";

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * It makes a GET request to the endpoint `/publication` and returns the response data.
 * @returns  An array of objects.
 */
export async function getPublications() {
    const endpoint = `${baseApiEndpoint}/publication`;

    const response = await axios.get(endpoint);
    return response.data.data;
}

/**
 * It makes a POST request to the endpoint `/publication/create` to create a publication
 */
export async function createPublications(body) {
    const endpoint = `${baseApiEndpoint}/publication/create`;

    const response = await axios.post(endpoint, body);
    return response.data;
}