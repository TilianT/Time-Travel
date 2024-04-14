import axios from 'axios';

const basePath = process.env.VUE_APP_BASE_API;
const postsPath = '/posts';

/**
 * Gets the list of the posts
 *
 * @returns {Promise} - Response promise
 */
const getList = (): Promise<any> => axios.get(`${basePath}${postsPath}`);

export default {
  getList,
};
