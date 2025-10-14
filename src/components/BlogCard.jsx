import styled from "styled-components";

export default function BlogCard({ title, createdAt, updatedAt }) {
    function convertDate(date) {
        return new Date(date).toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }

    return (
        <Container>
            <p>{title}</p>
            <p>Created: {convertDate(createdAt)}</p>
            {updatedAt && <p>Updated: {convertDate(updatedAt)}</p>}
        </Container>
    );
}

const Container = styled.div`
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.05s ease-in-out;

    &:hover {
        outline: 10px solid #449b9b;
        outline-offset: -10px;
    }
`;
