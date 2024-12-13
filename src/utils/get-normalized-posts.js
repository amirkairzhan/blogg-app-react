export function getNormalizedPosts(postsList) {
    const ids = [];
    const byIds = {};

    postsList.map(post => {
        ids.push(post.id);
        byIds[post.id] = {
            ...post,
            time: new Date().toLocaleString()
        };
    });

    return [ids, byIds];
}