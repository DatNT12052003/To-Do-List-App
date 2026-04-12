export const usersResource = (users: any) => {
    return users.map((user: any) => userResource(user));
};

export const userResource = (user: any) => {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at,
    };
};
