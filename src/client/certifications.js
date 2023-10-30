import axios from 'axios';

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * This function gets all certifications
 */
export async function getCertifications() {
    const endpoint = `${baseApiEndpoint}/certifications`;

    await axios.get(endpoint);
}
