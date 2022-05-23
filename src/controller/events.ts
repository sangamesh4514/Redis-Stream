import express, { Request, Response } from "express";
import { startStream,stopStream } from "../redis";

let a= true;
export const getEvents = async (req: Request, res: Response) => {
    res.send({events:{id:2}})
};

export const toggleRedis = async (req: Request, res: Response) => {
    a?startStream():stopStream()
    a=!a;
      res.send(`Pulishing to redis stream -   ${!a}`)
};


