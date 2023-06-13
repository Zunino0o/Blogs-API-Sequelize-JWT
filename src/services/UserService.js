const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

const getAll = async () => {
    const users = await User.findAll(
        {
            include: {
                model: BlogPost,
                as: 'posts',
            },
        },
    );

    return users;
};

module.exports = {
    getAll,
};