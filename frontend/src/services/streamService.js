import axios from "axios";

const API_BASE_URL = "https://groerx-backend.onrender.com/api";

export const getStreams = async () => {
  const response = await axios.get(`${API_BASE_URL}/streams`);
  return response.data;
};

export const getRecommendedStream = async (studentId = "demo-student") => {
  const response = await axios.get(
    `${API_BASE_URL}/streams/recommended/${studentId}`
  );
  return response.data;
};

export const getStreamBySlug = async (slug) => {
  const response = await axios.get(`${API_BASE_URL}/streams/${slug}`);
  return response.data;
};



