import axios from "axios";

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * It makes a GET request to the endpoint `/topics` and returns the response data.
 * @returns  An array of objects.
 */
export async function getESR() {
    const endpoint = `${baseApiEndpoint}/company-certifications`;

    const response = await axios.get(endpoint);
    return response.data.data.companies;
}
