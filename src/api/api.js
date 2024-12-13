const BASE_URL = 'https://jsonplaceholder.typicode.com'

export function getPosts() {
    return fetch(`${BASE_URL}/posts`)
        .then(response => {
            if (!response.ok) {
            throw new Error("API response failed");
            }

            return response.json()
        });
}

export function deletePost(id) {
    return fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
      });
}

export function updatePost(post) {
    return fetch(`${BASE_URL}/posts/${post.id}`, {
        method: 'PUT',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
}

export function createPost(post) {
    return fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
}