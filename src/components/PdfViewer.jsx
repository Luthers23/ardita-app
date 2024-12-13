import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { getFilePlugin } from "@react-pdf-viewer/get-file";
import { rotatePlugin } from "@react-pdf-viewer/rotate";
import { Box } from "@mui/material";
import { H5 } from "./Typography";
import FlexBetween from "./flexbox/FlexBetween";
import FlexRowAlign from "./flexbox/FlexRowAlign";

const PDFViewer = ({ pdfUrl }) => {
  const zoomPluginInstance = zoomPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const getFilePluginInstance = getFilePlugin();
  const rotatePluginInstance = rotatePlugin();

  const { Toolbar } = toolbarPluginInstance;
  const { DownloadButton } = getFilePluginInstance;
  const { RotateBackwardButton, RotateForwardButton } = rotatePluginInstance;

  const renderCustomToolbar = (toolbarSlot) => {
    const {
      CurrentPageInput,
      GoToNextPage,
      GoToPreviousPage,
      Zoom,
      ZoomIn,
      ZoomOut,
      NumberOfPages,
    } = toolbarSlot;

    return (
      <FlexBetween
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <FlexRowAlign gap={1}>
          <CurrentPageInput />
          <Box>
            <H5>/</H5>
          </Box>
          <NumberOfPages />
          <GoToPreviousPage />
          <GoToNextPage />
          <ZoomOut />
          <Zoom />
          <ZoomIn />
        </FlexRowAlign>
        <FlexRowAlign>
          <RotateBackwardButton />
          <RotateForwardButton />
          <DownloadButton />
        </FlexRowAlign>
      </FlexBetween>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "90vh" }}>
      <div>{<Toolbar>{renderCustomToolbar}</Toolbar>}</div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            fileUrl={pdfUrl}
            plugins={[
              zoomPluginInstance,
              toolbarPluginInstance,
              getFilePluginInstance,
              rotatePluginInstance,
            ]}
          />
        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;
