import { Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";
import { AxiosError } from "axios";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API,
});
const openai = new OpenAIApi(configuration);

export const generateImage = async (req: Request, res: Response) => {
  const { prompt, number, size } = req.body;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: number,
      size: imageSize,
    });
    let i = 0;
    let imageUrlArr = [];
    while (i < number) {
      imageUrlArr.push(response.data.data[i].url);
      i++;
    }
    res.status(200).json({
      success: true,
      data: imageUrlArr,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.status);
      console.log(error.response?.data);
    } else {
      console.log((error as any)?.message);
    }

    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};
