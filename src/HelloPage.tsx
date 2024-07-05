import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Container, Typography, CircularProgress } from "@mui/material";
import { Post } from "./types";
import DepartmentsComponent from "./DepartmentsComponent";

const PostsTable: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get<Post[]>(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "userId", headerName: "User ID", width: 90 },
        { field: "title", headerName: "Title", width: 300 },
        { field: "body", headerName: "Body", width: 500 },
    ];

    if (loading) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Loading Posts...
                </Typography>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Posts
                </Typography>
                <div style={{ height: 600, width: "100%" }}>
                    <DataGrid rows={posts} columns={columns} autoPageSize />
                </div>
            </Container>
            <DepartmentsComponent />
        </>
    );
};

export default PostsTable;
