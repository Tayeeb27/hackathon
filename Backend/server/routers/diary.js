const { Router } = require('express');
const diaryController = require('../controllers/diary')

const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);
diaryRouter.get("/:id", diaryController.showID);
diaryRouter.get("/date/:date", diaryController.showDate);
diaryRouter.get("/category/:category", diaryController.showCategory);
diaryRouter.post("/", diaryController.create);
diaryRouter.patch("/:id", diaryController.update);
diaryRouter.delete("/:id", diaryController.destroy);

module.exports = diaryRouter;
