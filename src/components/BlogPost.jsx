import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import NavigationBar from "./NavigationBar";

export default function BlogPost() {
    const BLOG_API = import.meta.env.VITE_BLOG_API_URL || "/posts";
    const { id } = useParams();

    const { data, loading, error } = useFetch(`${BLOG_API}/${id}`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data</p>;

    return (
        <>
            <NavigationBar />
            <Container>
                <h1>{data.title}</h1>
                {data.content
                    .split("\n")
                    .map((paragraph, index) =>
                        paragraph.trim() ? <p key={index}>{paragraph}</p> : null
                    )}
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;
