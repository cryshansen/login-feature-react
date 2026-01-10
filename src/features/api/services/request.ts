// features/api/services/request.ts

export async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {

  console.log(url);

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    if (!response.ok) {
      let message = `HTTP error! status: ${response.status}`;

      try {
        const errorBody = await response.json();
        message = errorBody.error || message;
        console.log(message);
      } catch {
        // ignore JSON parse failure
      }
      throw new Error(message);
    }

    console.log(response);
    const data = await response.json();
      console.log(data);
      return data;
    //return response.json();

  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
