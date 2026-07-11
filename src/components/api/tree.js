import {API_Request} from './backend.js';

export async function API_GetTree() {
  const response = await API_Request('/api/v2/tree');
  const tree = await response.json();

  if (!Array.isArray(tree)) {
    throw new TypeError('api tree response must be an array');
  }

  return tree;
}
