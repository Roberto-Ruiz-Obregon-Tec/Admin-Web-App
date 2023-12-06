import axios from 'axios';

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * This function gets all users
 */
export async function getUsers() {
    const endpoint = `${baseApiEndpoint}/user`;

    const response = await axios.get(endpoint);    
    return response.data.data.users;    

}

export async function patchUser(body) {
    const endpoint = `${baseApiEndpoint}/user/auth/updateme`;

    const response = await axios.patch(endpoint, body);
    return response.data;

}
