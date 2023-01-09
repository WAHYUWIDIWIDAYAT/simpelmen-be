import db from "../../models/index.js";
const Products = db.products;
const Product_Materials = db.product_materials;
const Product_Sizes = db.product_sizes;
const Product_Categories = db.product_categories;
const Product_Finishings = db.product_finishings;
const Jenis_Products = db.jenis_products;
const Op = db.Sequelize.Op;
import multer from "multer";

// Load .env file
import * as dotenv from "dotenv";

dotenv.config();


const ShowAllProducts = (req, res) => {
    Products.findAll({
        include: [
            {
                model: Product_Materials,
                as: "product_materials",
            },
            {
                model: Product_Sizes,
                as: "product_sizes",
            },
            {
                model: Product_Categories,
                as: "product_categories",
            },
            {
                model: Product_Finishings,
                as: "product_finishings",
            },
            {
                model: Jenis_Products,
                as: "jenis_products",

            },

        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products.",
            });
        });
}


const ShowProductById = (req, res) => {
    const id = req.params.id;

    Products.findByPk(id, {
        include: [
            {
                model: Product_Materials,
                as: "product_materials",
            },
            {
                model: Product_Sizes,
                as: "product_sizes",
            },
            {
                model: Product_Categories,
                as: "product_categories",
            },
            {
                model: Product_Finishings,
                as: "product_finishings",
            },
            {
                model: Jenis_Products,
                as: "jenis_products",

            },
        ],
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products.",
            });
        });
}


const updateProduct = (req, res) => {
    const id = req.params.id;

    Products.update(req.body, {
        where: { product_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Product was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Product with id=" + id,
            });
        });
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single("product_image");

const createProduct = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        else {
            const product_name = req.body.product_name;
            const product_price = req.body.product_price;
            const product_description = req.body.product_description;
            const product_material_id = req.body.product_material_id;
            const product_size_id = req.body.product_size_id;
            const product_category_id = req.body.product_category_id;
            const product_finishing_id = req.body.product_finishing_id;
            const jenis_product_id = req.body.jenis_product_id;
            const product_image = req.file.filename;

            Products.create({
                product_image: product_image,
                product_name: product_name,
                product_price: product_price,
                product_description: product_description,
                product_material_id: product_material_id,
                product_size_id: product_size_id,
                product_category_id: product_category_id,
                product_finishing_id: product_finishing_id,
                jenis_product_id: jenis_product_id,
            })
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Product.",
                    });
                }
                );
        }
    });
}
const deleteProduct = (req, res) => {
    const id = req.params.id;
    
    Products.destroy({
        where: { product_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id,
            });
        });
}


const ShowAllProductByCategory = (req, res) => {
    const id = req.params.id;
    Products.findOne({
        where: { product_id: id },
        attributes: { exclude:['product_weight','createdAt','updatedAt','product_price']},
        include: [
            {
                model: Jenis_Products,
                as: "jenis_products",
            },
        ],
    })
    .then((data) => {
        Products.findAll({
            where: { jenis_product: data.jenis_products.jenis_product_id },
            // where: { product_category: data.product_category , product_id: { [Op.ne]: id } },
            order: [
                ['product_id', 'DESC'],
            ],
            attributes: { exclude: ['product_image','product_price','product_description','product_name','createdAt','updatedAt'] },
            include: [
                {
                    model: Product_Categories,
                    as: "product_categories",
                    attributes: ['product_category_name', 'product_category_id']
                },
                {
                    model: Product_Materials,
                    as: "product_materials",
                    attributes: ['product_material_name', 'product_material_id']
                },
                {
                    model: Product_Sizes,
                    as: "product_sizes",
                    attributes:{exclude:['createdAt','updatedAt']}
                },
                {
                    model: Product_Finishings,
                    as: "product_finishings",
                    attributes:{exclude:['createdAt','updatedAt']}
                },
            ],
        })
        

        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving products.",
            });
        });
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products.",
        });
    });
}



export { ShowAllProducts, ShowProductById, updateProduct, deleteProduct, createProduct,ShowAllProductByCategory };