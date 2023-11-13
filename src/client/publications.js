import axios from "axios";

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * It makes a GET request to the endpoint `/publication` and returns the response data.
 * @returns  An array of objects.
 */
export async function getPublications() {
    const endpoint = `${baseApiEndpoint}/publication`;

    const response = await axios.get(endpoint);
    return response.data.data.publications;
}