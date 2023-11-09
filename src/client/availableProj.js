import axios from "axios";

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * It makes a GET request to the endpoint `/topics` and returns the response data.
 * @returns  An array of objects.
 */
export async function getProgram() {
    const endpoint = `${baseApiEndpoint}/program`;

    const response = await axios.get(endpoint);
    return response.data.data.programs;
}


/**
 * It makes a POST request to the endpoint `/program/create` and returns the response data.
 */
export async function createAProject(data) {
    const endpoint = `${baseApiEndpoint}/program/create`;

    const response = await axios.post(endpoint, data);
    return response.data;
} 