import axios from "axios";

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * It makes a GET request to the endpoint `/topics` and returns the response data.
 * @returns  An array of objects.
 */
export async function getESR() {
    const endpoint = `${baseApiEndpoint}/company-certifications`;

    const response = await axios.get(endpoint);
    console.log(response)
    return response.data.data.companies;
}

export async function editESR(data) {
    const endpoint = `${baseApiEndpoint}/company-certifications/update`;

    const response = await axios.put(endpoint, data);        
    return response.data;
}

/**
 * It makes a DELETE request to the endpoint `/company-certifications/${id}` and returns the response data.
 */
export async function deleteESR(id) {
    const endpoint = `${baseApiEndpoint}/company-certifications/${id}`;
    
    const response = await axios.delete(endpoint);
    return response.data;
}