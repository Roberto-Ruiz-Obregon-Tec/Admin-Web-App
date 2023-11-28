import axios from 'axios';

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * This function gets all certifications
 */
export async function getCertifications() {
    const endpoint = `${baseApiEndpoint}/certifications`;

    const response = await axios.get(endpoint);
    return response.data.data;
}

export async function createACertification(data) {
    const endpoint = `${baseApiEndpoint}/certifications/`;
    const response = await axios.post(endpoint, data);
    return response.data;
} 

export async function updateACertification(data) {
    const endpoint = `${baseApiEndpoint}/certifications/${data._id}`;
    const response = await axios.patch(endpoint, data);
    return response.data;
}

export async function deleteCertification(id) {
    const endpoint = `${baseApiEndpoint}/certifications/${id}`;
    const response = await axios.delete(endpoint);
    return response.data;
}