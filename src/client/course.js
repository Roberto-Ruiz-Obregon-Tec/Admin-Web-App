import axios from 'axios';

const baseApiEndpoint = process.env.REACT_APP_BASE_API_ENDPOINT;

/**
 * It makes a GET request to the endpoint `/course` and returns the response data.
 * @returns An array of objects.
 */
export async function getCourses() {
    const response = await axios.get(`${baseApiEndpoint}/course`);
    return response.data.data;
}

/**
 * It gets the inscriptions of a course
 * @param courseId - The id of the course
 * @returns An array of objects.
 */
export async function getCourseInscriptions(courseId) {
    const endpoint = `${baseApiEndpoint}/course/getinscriptions/${courseId}`;

    const response = await axios.get(endpoint);
    return response.data.data.documents;
}

/**
 * It takes a topic object, sends it to the server, and returns the response.
 * @param course - {
 * @returns An array of topics.
 */
export async function postCourse(courseForm) {
    const endpoint = `${baseApiEndpoint}/course/create`;

    const response = await axios.post(endpoint, courseForm);

    return response.data;
}

/**
 * It takes an id, and then deletes the course with that id
 * @param id - The id of the course to delete
 */
export async function deleteCourse(id) {
    const endpoint = `${baseApiEndpoint}/course/${id}`;

    await axios.delete(endpoint);
}

/**
 * It makes a GET request to the API endpoint, and returns the data.
 * @param id - The id of the course you want to get
 * @returns The response.data.data.document is being returned.
 */
export async function getCourse(id) {
    const endpoint = `${baseApiEndpoint}/course/${id}`;

    const response = await axios.get(endpoint);
    return response.data.data.document;
}

/**
 * It takes an id and a form, and then it makes a patch request to the endpoint with the id and the
 * form.
 * @param id - The id of the course you want to update
 * @param form - {
 * @returns The response.data.data.document is the data that is being returned.
 */
export async function patchCourse(id, form) {
    const endpoint = `${baseApiEndpoint}/course/${id}`;

    const response = await axios.patch(endpoint, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data.document;
}

/**
 * It makes a PUT request to the endpoint `/program/update`
 */
export async function editCourse(data) {
    const endpoint = `${baseApiEndpoint}/course/update`;

    const response = await axios.put(endpoint, data);
    return response.data;    
} 
