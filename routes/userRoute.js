const router = require("express").Router();
const controller = require('../controllers/controller');

router.route('/api/categories')
.post(controller.createCategories)
.get(controller.getCategories)

router.route('/api/transaction')
.post(controller.createTransaction)
.get(controller.getTransaction)
.delete(controller.deleteTransaction)

router.route('/api/labels')
.get(controller.getLabels)


module.exports = router;