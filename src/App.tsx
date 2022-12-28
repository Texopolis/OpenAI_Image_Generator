import { useState } from "react";
import { GridLoader } from "react-spinners";

function App() {
  const LOCAL_HOST = "http://localhost:3000/openai/generateImage";

  const [prompt, setPrompt] = useState("");
  const [num, setNum] = useState<number>(1);
  const [size, setSize] = useState("small");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setImages([]);
    const formBody = { prompt: prompt, number: num, size: size };

    const res = await fetch(LOCAL_HOST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    if (!res.ok) {
      setLoading(false)
      alert("HTTP-Error: " + res.status);
    } else {
      let imgArr = await res.json();
      setImages(imgArr.data);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <header className="font-semibold text-2xl  text-cyan-500 p-8">
        OpenAI Image Generator
      </header>

      <main className="min-h-screen text-amber-500 flex flex-col  items-center mt-8">
        <form action="submit" onSubmit={handleSubmit} className="w-5/6">
          <div className="flex items-center justify-center gap-2 my-2">
            <label htmlFor="prompt">Prompt:</label>
            <textarea
              id="prompt"
              className="bg-slate-500 rounded p-2 w-9/12"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 my-2">
            <label htmlFor="number">Number:</label>
            <input
              id="number"
              type="tel"
              className="bg-slate-500 rounded p-2 w-10 text-center"
              value={num}
              onChange={(e) => {
                setNum(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="flex items-center justify-center gap-2 my-2">
              <label htmlFor="small">Small:</label>
              <input
                name="size"
                id="small"
                type="radio"
                value="small"
                checked={size === "small"}
                className="w-6 h-6 "
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-center gap-2 my-2">
              <label htmlFor="medium">Medium:</label>
              <input
                name="size"
                id="medium"
                type="radio"
                value="medium"
                checked={size === "medium"}
                className="w-6 h-6"
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-center gap-2 my-2">
              <label htmlFor="large">Large:</label>
              <input
                name="size"
                id="large"
                type="radio"
                value="large"
                checked={size === "large"}
                className="w-6 h-6"
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 my-2">
            <button type="submit" className="p-4 bg-sky-700 rounded">
              Submit
            </button>
            <button
              type="reset"
              className="p-4 bg-sky-700 rounded"
              onClick={() => {
                setPrompt("");
                setNum(1);
                setSize("small");
                setImages([])
              }}>
              Clear
            </button>
          </div>
        </form>
        <div className="mt-8">
          <div className="flex gap-4 flex-wrap items-center justify-center">
            {images.map((image) => {
              return <img key={image} src={image} />;
            })}
          </div>
          <GridLoader loading={loading} color="#06B6D4" size="75px"/>
        </div>
      </main>
    </div>
  );
}

export default App;
