const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get("/", (req, res) => {
    Category.findAll({
      include: [
        { 
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    })
      .then((category) => res.json(category))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  });

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { 
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    })
    .then((category) => res.json(category))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// create a new category
router.post('/', (req, res) => {
    Category.create({
      category_name: req.body.category_name
    })
    .then((category) =>
      res.json(
      `✅ New Category created ... (ID: ${category.id})`
    )
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
    Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((category) =>
      res.json(
      `✅ Category updated.`
    )
  )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });
    
// delete a category by its `id` value  
router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((category) =>
    res.json(
      `✅ Category deleted.)`
    )
  )
    .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});
    
module.exports = router;
