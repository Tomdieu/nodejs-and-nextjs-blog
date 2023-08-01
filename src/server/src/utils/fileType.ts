export default (
  file: Express.Multer.File
): "image" | "video" | "audio" | "pdf" | "unknown" => {
  const imageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];
  const videoMimeTypes = ["video/mp4", "video/quicktime", "video/webm"];
  const audioMimeTypes = ["audio/mpeg", "audio/ogg", "audio/wav"];
  const pdfMimeType = "application/pdf";

  if (imageMimeTypes.includes(file.mimetype)) {
    return "image"; // File is an image
  } else if (videoMimeTypes.includes(file.mimetype)) {
    return "video"; // File is a video
  } else if (audioMimeTypes.includes(file.mimetype)) {
    return "audio"; // File is an audio
  } else if (file.mimetype === pdfMimeType) {
    return "pdf"; // File is a PDF
  }

  return "unknown";
};
