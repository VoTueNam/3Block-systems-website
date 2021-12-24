const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// Tạo tuyến đường ở đây sau đó qua Controller viết hàm để gọi render
router.get('/test', siteController.test);
router.post('/test/result', siteController.testResult);
router.post('/result', siteController.result);
router.get('/:404', siteController.error404);
router.get('/:404/:404', siteController.error404);
router.get('/:404/:404/:404', siteController.error404);
router.get('/', siteController.home);

module.exports = router;
