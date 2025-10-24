import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import BlogCard from "./BlogCard";
import BlogListSkeletonLoader from "./BlogListSkeletonLoader";

const BLOG_API = import.meta.env.VITE_BLOG_API_URL;

export default function BlogList() {
    const { data, loading, error } = useFetch(`${BLOG_API}/posts`);

    if (loading) return <BlogListSkeletonLoader />;
    if (error) return <Error />;

    return (
        <>
            <Container>
                <TitleZone>
                    <h1>KVG Blogs</h1>
                </TitleZone>
                <PostContainer>
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
                </PostContainer>
            </Container>
        </>
    );
}

const Container = styled.div`
    max-width: 1000px;
    margin: 1rem auto 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const TitleZone = styled.div`
    border-radius: 5px;
    max-width: 1100px;
    width: 100%;
    background-color: #3d3d3d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    border: 1px solid #3d3d3d;
    box-shadow: 0px 0px 10px 5px #0f0f0f;
`;

const PostContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

const Error = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
`;
