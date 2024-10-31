

export const api = async (url: string, options: RequestInit = {}): Promise<any> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
