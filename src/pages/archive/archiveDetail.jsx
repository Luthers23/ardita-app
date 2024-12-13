import { Box, Card } from "@mui/material";
import PDFViewer from "components/PdfViewer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ArchiveDetail = () => {
  const { id } = useParams();
  const url = process.env.REACT_APP_BACKEND;
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/api/archives/${id}`);
        setPdfUrl(response.data.url);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPdfUrl();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box>
      <Card
        sx={{
          padding: 3,
          height: "100%",
          width: "100%",
        }}
      >
        <PDFViewer pdfUrl={pdfUrl} />
      </Card>
    </Box>
  );
};

export default ArchiveDetail;
