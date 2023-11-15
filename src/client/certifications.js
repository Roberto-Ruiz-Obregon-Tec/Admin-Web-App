import axios from 'axios';

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * This function gets all certifications
 */
export async function getCertifications() {
    const endpoint = `${baseApiEndpoint}/certifications`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

export async function createACertification(data) {
    const endpoint = `${baseApiEndpoint}/certification/create`;

    const response = await axios.post(endpoint, data);
    return response.data;
} 