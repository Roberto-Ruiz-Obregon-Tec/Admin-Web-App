import axios from 'axios';

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * This function gets all certifications
 */
export async function getCertifications() {
    const endpoint = `${baseApiEndpoint}/certifications`;

    const response = await axios.get(endpoint);    
    console.log(response)
    return response.data.data;
}

export async function createACertification(data) {
    const endpoint = `${baseApiEndpoint}/certification/create`;

    const response = await axios.post(endpoint, data);
    return response.data;
}

export async function editCertification(data) {
    const endpoint = `${baseApiEndpoint}/certifications/${data._id}`;

    const response = await axios.patch(endpoint, data);
    return response.data;
} 