const BlogPost = require('../models/BlogPost');
const { User } = require('../models');

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

const getByEmail = async (email) => {
    const user = await User.findOne({
        where: {
            email,
        },
        // include: {
        //     model: BlogPost,
        //     as: 'posts',
        // },
    });
    return user;
};

module.exports = {
    getAll,
    getByEmail,
};