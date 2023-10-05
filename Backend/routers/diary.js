const { Router } = require('express');
const diaryController = require('../controllers/countries')

const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);
diaryRouter.get("/:name", diaryController.show);
diaryRouter.post("/", diaryController.create);
diaryRouter.patch("/:name", diaryController.update);
diaryRouter.delete("/:name", diaryController.destroy);

module.exports = diaryRouter;