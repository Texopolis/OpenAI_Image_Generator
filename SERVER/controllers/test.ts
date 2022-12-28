import { Request, Response } from "express";

export const testResponse = async (req: Request, res: Response) => {
    
    try {
      const response = "Hello from test server"
      res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      console.log((error as any)?.message);
      
  
      res.status(400).json({
        success: false,
        error: "There was an error in the test server response",
      });
    }
  };
  