'use strict';
//JSdocs
  /**
   * @param {import('sequelize').Sequelize } sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
   'use strict';

   const createPostCategoryModel = (sequelize, DataTypes) => {
     const PostCategory = sequelize.define('PostCategory', {
       postId: {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
         allowNull: false,
         primaryKey: true,
         type: DataTypes.INTEGER,
         reference: {
           model: 'BlogPost',
           key: 'id',
         },
       },
       categoryId: {
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
         allowNull: false,
         primaryKey: true,
         type: DataTypes.INTEGER,
         reference: {
           model: 'Category',
           key: 'id',
         },
       },
     }, {
       tableName: 'PostCategories'
     });
   
     PostCategory.associate = (models) => {
       models.BlogPost.belongsToMany(models.Category, {
         foreignKey: 'postId',
         otherKey: 'categoryId',
         as: 'categories',
         through: PostCategory,
       }),
       models.Category.belongsToMany(models.BlogPost, {
         foreignKey: 'categoryId',
         otherKey: 'postId',
         as: 'blogPosts',
         through: PostCategory,
       });
     }
     return PostCategory;
   };
   
   module.exports = createPostCategoryModel;