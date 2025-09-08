import React, { useState } from "react";
import log from "logging-middleware";

export default function URLShortener() {
  const [inputs, setInputs] = useState([{ url: "", code: "", validity: "" }]);
  const [results, setResults] = useState([]);


  function handleChange(i, field, value) {
    const newInputs = [...inputs];
    newInputs[i][field] = value;
    setInputs(newInputs);
  }

  function addField() {
    if (inputs.length < 5) setInputs([...inputs, { url: "", code: "", validity: "" }]);
  }

  function shorten() {
    try {
      const stored = JSON.parse(localStorage.getItem("urls") || "[]");
      const newResults = [];
      for (let i = 0; i < inputs.length; i++) {
        let { url, code, validity } = inputs[i];
        if (!url) {
          continue;
        }
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
          url = `https://${url}`;
        }
        let shortcode = code || Math.random().toString(36).substring(2, 7);
        if (stored.find(u => u.code === shortcode)) {
          log("warn", "component", "Shortcode collision");
          continue;
        }
        const minutes = validity ? parseInt(validity) : 30;
        const createdAt = new Date();
        const expiresAt = new Date(createdAt.getTime() + minutes * 60000);
        const record = { url, code: shortcode, createdAt, expiresAt, clicks: [] };
        stored.push(record);
        newResults.push(record);
        log("info", "component", `Shortened URL ${url} to ${shortcode}`);
      }
      localStorage.setItem("urls", JSON.stringify(stored));
      setResults(newResults);
    } catch (e) {
      log("fatal", "component", "Unexpected error in shorten()");
    }
  }

  function loadAllUrls() {
    try {
      const stored = JSON.parse(localStorage.getItem("urls") || "[]");
      setResults(stored);
    } catch (e) {
      console.error("Failed to load URLs from local storage.");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>URL Shortener</h2>
      {inputs.map((inp, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <input
            placeholder="Long URL"
            value={inp.url}
            onChange={e => handleChange(i, "url", e.target.value)}
          />
          <input
            placeholder="Custom shortcode"
            value={inp.code}
            onChange={e => handleChange(i, "code", e.target.value)}
          />
          <input
            placeholder="Validity (minutes)"
            value={inp.validity}
            onChange={e => handleChange(i, "validity", e.target.value)}
          />
        </div>
      ))}
      <button onClick={addField}>+ Add another</button>
      <button onClick={shorten}>Shorten</button>
      <button onClick={loadAllUrls}>Load All URLs</button>

      <h3>Results</h3>
      {results.map((r, i) => (
        <div key={i}>
          <p>
            Original: {r.url} <br />
            Short: <a href={`/${r.code}`}>{window.location.origin}/{r.code}</a> <br />
            Expires: {new Date(r.expiresAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
