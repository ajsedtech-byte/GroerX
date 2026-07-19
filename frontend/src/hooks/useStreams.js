import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export default function useStreams() {
  const [streams, setStreams] = useState([]);
  const [recommended, setRecommended] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const streamsRes = await axios.get(`${API_BASE_URL}/streams`);
        const streamList = streamsRes.data?.data || [];

        let recommendation = streamList[0] || null;

        try {
          const studentId = localStorage.getItem("studentId") || "123";
          const recommendationRes = await axios.get(
            `${API_BASE_URL}/streams/recommended/${studentId}`
          );

          recommendation =
            recommendationRes.data?.recommendation || streamList[0] || null;
        } catch (recError) {
          console.warn("Recommendation failed, using first stream");
        }

        setStreams(streamList);
        setRecommended(recommendation);
        setError("");
      } catch (err) {
        console.error("Stream Explorer Error:", err);
        setError("Unable to load Stream Explorer.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    streams,
    recommended,
    loading,
    error,
  };
}

