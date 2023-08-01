export default function getFileDestination(file: Express.Multer.File): string {
  let destinationFolder = "";
  if (file.mimetype.startsWith("image")) {
    destinationFolder = "/media/images/";
  } else if (file.mimetype.startsWith("video")) {
    destinationFolder = "/media/videos/";
  } else if (file.mimetype === "application/pdf") {
    destinationFolder = "/media/pdf/";
  }
  return destinationFolder;
}
