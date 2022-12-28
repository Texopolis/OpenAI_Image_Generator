// import React from "react";
// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: "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",
// });

// const openai = new OpenAIApi(configuration);

// const generateImage =async () => {
//     const res = await openai.createImage({
//         prompt: "create 2 images that when combined look really cool when a paralax effect is put on them",
//         n: 2,
//         size: "1024x1024",
//     });
//     console.log('res: ',res.data.data[0].url, res.data.data[1].url)
// }

// const Request = () => {
//   return (
//     <div>
//       <button
//         onClick={generateImage}>
//         Generate
//       </button>
//     </div>
//   );
// };

// export default Request;
