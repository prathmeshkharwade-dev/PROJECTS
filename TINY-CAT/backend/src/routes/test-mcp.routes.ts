import Express from "express";
import { testMcpController } from "../controller/test-mcp.controller.ts";

const router = Express.Router();

router.get("/test-mcp" , testMcpController);


export default router;