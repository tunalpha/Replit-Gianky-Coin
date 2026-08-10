import { Router, type IRouter } from "express";
import healthRouter from "./health";
import giankycoinRouter from "./giankycoin";
import nftsRouter from "./nfts";

const router: IRouter = Router();

router.use(healthRouter);
router.use(giankycoinRouter);
router.use(nftsRouter);

export default router;
