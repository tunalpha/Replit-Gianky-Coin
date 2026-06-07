import { Router, type IRouter } from "express";
import healthRouter from "./health";
import giankycoinRouter from "./giankycoin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(giankycoinRouter);

export default router;
