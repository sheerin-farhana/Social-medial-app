const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Post = sequelize.define('Posts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    link: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
});
  
const Comment = sequelize.define('Comments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
});
  
Post.hasMany(Comment);
Comment.belongsTo(Post);


module.exports = { Post, Comment };