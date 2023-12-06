import axios from 'axios';

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * It makes a GET request to the endpoint `/course` and returns the response data.
 * @returns An array of objects.
 */
export async function getComments() {
    const response = await axios.get(`${baseApiEndpoint}/comment`);
    return response.data.data;
}

export async function updateStatus(data) {
    const body = {_id: data.id, status: data.status};
    
    const response = await axios.put(`${baseApiEndpoint}/comment/update-status`, body);
    return response.status;

}