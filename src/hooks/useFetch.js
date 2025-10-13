import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network error");
                }
                return response.json();
            })
            .then((response) => setData(response))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { data, error, loading };
}
