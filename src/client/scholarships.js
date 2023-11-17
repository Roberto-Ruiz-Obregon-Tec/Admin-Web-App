import axios from "axios";

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * It makes a GET request to the endpoint `/publication` and returns the response data.
 * @returns  An array of objects.
 */
export async function getScholarships() {
    const endpoint = `${baseApiEndpoint}/scholarships`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 * It makes a POST request to the endpoint `/scholarships/create` and returns the response data.
 */
export async function createScholarships(data) {
    const endpoint = `${baseApiEndpoint}/scholarships/create`;

    const response = await axios.post(endpoint, data);
    return response.data;
} 

/**
 * It makes a PUT request to the endpoint `/scholarships/update` and returns the response data.
 */
export async function editScholarships(data) {
    const endpoint = `${baseApiEndpoint}/scholarships/update`;

    const response = await axios.put(endpoint, data);
    return response.data;
} 