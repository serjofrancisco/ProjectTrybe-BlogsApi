'use strict';
//JSdocs
  /**
   * @param {import('sequelize').Sequelize } sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
   const createCategoryModel = (sequelize, DataTypes) =>{
    const Category = sequelize.define('Category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    }, {
      tableName: 'Categories'
    })
    // Category.associate = (models) => {
    //   Category.hasMany(models.PostCategory, {
    //     foreignKey: 'categoryId',
    //     as: 'postCategories',
    //   });
  
    // }
    return Category;
  };

  module.exports = createCategoryModel;