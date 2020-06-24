import { Router } from 'express';
const router = new Router();

router.get("/", (req, res) => {
    res.logger.log("Hello :D");
    res.render("index");
})

export default router;