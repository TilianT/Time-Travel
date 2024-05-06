const postPath = new URL('posts', process.env.VUE_APP_BASE_API);

/**
 * Gets the list of the posts
 *
 * @returns {Promise} - Response promise
 */
const getList = async (): Promise<any> => {
  const response = await fetch(postPath.toString());

  if (response.status >= 500) {
    throw new Error('Internal server error');
  }

  if (response.status >= 400) {
    throw new Error('Bad request');
  }

  const data = (await response.json()) as unknown;

  return data;
};

export default {
  getList,
};
