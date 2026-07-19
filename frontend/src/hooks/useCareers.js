import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function useCareers() {
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [streamSlug, setStreamSlug] = useState("science-pcm");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCareers() {
      try {
        setLoading(true);

        const selectedStream =
          localStorage.getItem("selectedStreamSlug") || "science-pcm";

        setStreamSlug(selectedStream);

        const res = await axios.get(`${API}/careers?stream=${selectedStream}`);

        const list = res.data?.data || [];

        setCareers(list);
        setSelectedCareer(list[0] || null);
        setError("");
      } catch (err) {
        console.error("Career Explorer Error:", err.response?.data || err.message);
        setError("Unable to load Career Explorer.");
      } finally {
        setLoading(false);
      }
    }

    loadCareers();
  }, []);

  const filteredCareers = careers.filter((career) =>
    career.title.toLowerCase().includes(search.toLowerCase())
  );

  return {
    careers,
    filteredCareers,
    selectedCareer,
    setSelectedCareer,
    streamSlug,
    search,
    setSearch,
    loading,
    error,
  };
}

