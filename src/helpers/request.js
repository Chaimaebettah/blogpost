



const request = (url, options = {}) => {
    const nextOptions = {
        headers: {
            'Authorization': 'whatever-you-want',
            'Content-Type': 'application/json',
        },
        ...options
    };

    return fetch(`http://localhost:3001${url}`, nextOptions)
        .then(response => response.json())
};


export const getCategories = () => {
    return request('/categories')
};

export const getCategoryPosts = (categoryName) => {
    return request(`/${categoryName}/posts`)
};

export const addPosts = (values) => {
    return request('/posts', { method: 'POST', body: JSON.stringify(values)})
};

export const getPost = (postId) => {
    return request(`/posts/${postId}`)
};


export const editPost = (values, postId) => {
    return request(`/posts/${postId}`, { method: 'PUT', body: JSON.stringify(values)})
};


export const deletePost = (postId) => {
    return request(`/posts/${postId}`, { method: 'DELETE'})
};



export const AddComment = (comment) => {
    return request('/comments', { method: 'POST', body: JSON.stringify(comment)})
};


export const getComments = (postId) => {
    return request(`/posts/${postId}/comments`);
}







