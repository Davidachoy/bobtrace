// API service for BobTrace backend
const API_BASE_URL = "http://localhost:3001/api";

/**
 * Fetch with timeout and error handling
 */
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Get summary statistics from backend
 * Falls back to null if backend is unavailable
 */
export async function fetchSummary() {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/summary`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.summary) {
      return data.summary;
    }

    return null;
  } catch (error) {
    console.warn("Backend not available, using local data:", error.message);
    return null;
  }
}

/**
 * Get all sessions from backend
 * Falls back to null if backend is unavailable
 */
export async function fetchSessions() {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/sessions`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success && data.sessions) {
      return data.sessions;
    }

    return null;
  } catch (error) {
    console.warn("Backend not available, using local data:", error.message);
    return null;
  }
}

/**
 * Generate evidence pack
 */
export async function generateEvidencePack() {
  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/generate-evidence`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      10000, // 10 second timeout for generation
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        message: data.message,
        filePath: data.filePath,
      };
    }

    throw new Error(data.error || "Failed to generate evidence pack");
  } catch (error) {
    console.error("Error generating evidence pack:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}

/**
 * Check if backend is available
 */
export async function checkBackendHealth() {
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/health`, {}, 3000);

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.status === "ok";
  } catch {
    return false;
  }
}

// Made with Bob
