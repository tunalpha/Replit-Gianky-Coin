import { Router, type IRouter } from "express";
import healthRouter from "./health";
import giankycoinRouter from "./giankycoin";
import nftsRouter from "./nfts";
import stakesRouter from "./stakes";

const router: IRouter = Router();

router.use(healthRouter);
router.use(giankycoinRouter);
router.use(nftsRouter);
router.use(stakesRouter);

export default router;
