import { NextFunction, Request, Response } from "express";
import http from "./http";

function Middleware(error: http, req: Request, res: Response, next: NextFunction){
    const status: number = error.status || 500;
    const message: string = error.message || 'Something is wrong';

    console.log("Error output: " + status + " / " + message);
    res.status(status).json({ message });
}

export default Middleware;
