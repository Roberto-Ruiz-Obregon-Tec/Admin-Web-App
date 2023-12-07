import axios from 'axios';

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * This function gets all users
 */
export async function getUsers() {
    const endpoint = `${baseApiEndpoint}/user`;

    const response = await axios.get(endpoint);
    console.log(response)
    return response.data.data.users;    

}

export async function deleteUser(id) {
    const endpoint = `${baseApiEndpoint}/user/${id}`;

    const response = await axios.delete(endpoint);
    return response.data;
}
