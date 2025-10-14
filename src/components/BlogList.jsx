import BlogCard from "./BlogCard";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";

export default function BlogList() {
    const BLOG_API = import.meta.env.VITE_BLOG_API_URL;

    const { data, loading, error } = useFetch(BLOG_API);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data</p>;

    return (
        <>
            <h1>KVG Blogs</h1>
            <Container>
                {data && data.length > 0 ? (
                    data.map(
                        (blogpost) =>
                            blogpost.published && (
                                <BlogCard
                                    id={blogpost.id}
                                    key={blogpost.id}
                                    title={blogpost.title}
                                    description={blogpost.description}
                                    createdAt={blogpost.createdAt}
                                    updatedAt={blogpost.updatedAt}
                                />
                            )
                    )
                ) : (
                    <p>No items available</p>
                )}
            </Container>
        </>
    );
}

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;
