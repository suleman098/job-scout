export async function GET(req) {
  const appID = "AppID";
  const APIkey = "APIKEY";

  // Extract search parameters from the URL
  const url = new URL(req.url);
  const jobTitle = url.searchParams.get("title") || "Nurse";
  const location = url.searchParams.get("location") || "UK";

  try {
    const response = await fetch(
      `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${appID}&app_key=${APIkey}&results_per_page=20&what=${jobTitle}&where=${location}&content-type=application/json`
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
