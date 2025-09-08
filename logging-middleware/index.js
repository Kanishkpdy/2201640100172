const LOG_API_URL = "https://cors-anywhere.herokuapp.com/http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIxMmthbmlzaGtwYW5kZXkxMkBnbWFpbC5jb20iLCJleHAiOjE3NTczMjExMDgsImlhdCI6MTc1NzMyMDIwOCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjU5ZTkyZTEwLWY0MDYtNGUwMy1hN2VjLTkyNDU1ODBjNTFmNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImthbmlzaGsgcGFuZGV5Iiwic3ViIjoiYTEzYTVkMWItZjliYy00MTFlLTg3ZWMtMTQzYWNkZGE5NjdkIn0sImVtYWlsIjoiMTJrYW5pc2hrcGFuZGV5MTJAZ21haWwuY29tIiwibmFtZSI6ImthbmlzaGsgcGFuZGV5Iiwicm9sbE5vIjoiMjIwMTY0MDEwMDE3MiIsImFjY2Vzc0NvZGUiOiJzQVdUdVIiLCJjbGllbnRJRCI6ImExM2E1ZDFiLWY5YmMtNDExZS04N2VjLTE0M2FjZGRhOTY3ZCIsImNsaWVudFNlY3JldCI6IlFLVXJuRXZ6c2ZidkpOWUMifQ.k20PIbR_mOQZsQOPqHnDn_PmNfJz78VBF9ypLqjkUxE";

async function log(level, packageName, message) {
  const payload = { stack: "frontend", level, package: packageName, message };

  try {
    const logs = JSON.parse(localStorage.getItem("logs") || "[]");
    logs.push({ time: new Date().toISOString(), level, package: packageName, message });
    localStorage.setItem("logs", JSON.stringify(logs));
  } catch (err) {
    console.warn("Failed to save log locally.", err);
  }

  try {
    const res = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.warn(`Server logging failed with HTTP ${res.status}`);
    }
  } catch (err) {
    console.warn("Server logging failed, continuing execution.", err);
  }
}

export default log;
