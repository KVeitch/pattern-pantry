"use client";

import { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";

function PhotoCameraIcon() {
  return (
    <SvgIcon fontSize="small">
      <path d="M12 12m-3.2 0a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 1 0-6.4 0" />
      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    </SvgIcon>
  );
}
function AddPhotoIcon() {
  return (
    <SvgIcon fontSize="small">
      <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" />
    </SvgIcon>
  );
}
function DeleteIcon() {
  return (
    <SvgIcon fontSize="small">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </SvgIcon>
  );
}

export type CaptureResult = {
  id: string;
  type: "front" | "back";
  dataUrl: string;
  fileName?: string;
};

interface PhotoCaptureProps {
  label: string;
  type: "front" | "back";
  value?: CaptureResult | null;
  onChange: (value: CaptureResult | null) => void;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function PhotoCapture({
  label,
  type,
  value,
  onChange,
}: PhotoCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      onChange({
        id: generateId(),
        type,
        dataUrl: reader.result as string,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Attach stream to video after it mounts (video only exists once stream is set)
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleStartCamera = async () => {
    setCameraError(null);
    try {
      // "user" = front-facing/webcam (laptops); "environment" = rear (phones).
      // Use ideal so we fall back to any camera when only one exists (e.g. laptop).
      const facing = type === "back" ? "environment" : "user";
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facing } },
      });
      setStream(mediaStream);
    } catch (err) {
      setCameraError(
        err instanceof Error ? err.message : "Could not access camera"
      );
    }
  };

  const handleStopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !stream) return;
    const video = videoRef.current;
    if (!video.videoWidth || !video.videoHeight) {
      setCameraError("Please wait for the camera to start");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    onChange({
      id: generateId(),
      type,
      dataUrl,
      fileName: `cover-${type}.jpg`,
    });
    handleStopCamera();
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {label}
      </Typography>

      {value ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 280,
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "grey.200",
          }}
        >
          <Box
            component="img"
            src={value.dataUrl}
            alt={label}
            sx={{
              width: "100%",
              display: "block",
              verticalAlign: "middle",
            }}
          />
          <IconButton
            size="small"
            onClick={handleRemove}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : stream ? (
        <Box>
          <Box
            component="video"
            ref={videoRef}
            autoPlay
            playsInline
            muted
            sx={{
              width: "100%",
              maxWidth: 280,
              borderRadius: 2,
              bgcolor: "black",
            }}
          />
          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<PhotoCameraIcon />}
              onClick={handleCapture}
            >
              Take photo
            </Button>
            <Button variant="outlined" size="small" onClick={handleStopCamera}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          <Button
            variant="outlined"
            size="small"
            startIcon={<PhotoCameraIcon />}
            onClick={handleStartCamera}
          >
            Use camera
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddPhotoIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload image
          </Button>
          {cameraError && (
            <Typography variant="caption" color="error">
              {cameraError}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
