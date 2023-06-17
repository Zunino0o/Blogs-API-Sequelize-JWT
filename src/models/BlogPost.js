module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    "BlogPost", 
    {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    timestamps: false,
    tableName: "blog_posts",
    underscored: true,
  }
  );
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };
  return BlogPost;
};
