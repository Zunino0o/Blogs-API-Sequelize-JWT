module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define("PostCategory", {
      post_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    });
    return PostCategory;
  };
  