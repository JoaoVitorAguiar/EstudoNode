import { Request, Response } from "express";

export class helloWordController  {
    public async Show(_request : Request, response : Response) {
        return response.status(200).json({
            messege: "Hello World"
        })
    }
}