export const postResource = (post: any) => {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.author_id,
        published: post.published,
        createdAt: post.created_at,
    };
};

export const postsResource = (posts: any[]) => {
    return posts.map((post) => postResource(post));
};
