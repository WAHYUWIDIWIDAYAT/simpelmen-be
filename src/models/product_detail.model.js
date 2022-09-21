const Product_Detail = (sequelize, Sequelize) => {
  const product_detail = sequelize.define(
    "product_details",
    {
      product_detail_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_detail_name: {
        type: Sequelize.STRING,
      },
      size_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "sizes",
          key: "size_id",
        },
      },
      material_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "materials",
          key: "material_id",
        },
      },
      product_category_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true, // Enable timestamps
      createdAt: true, // Create createdAt
      updatedAt: true, // Create updatedAt
    }
  );

  return product_detail;
};

export default Product_Detail;