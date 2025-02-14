import React from 'react'
import  {useDropzone } from "react-dropzone";
import axios from "axios"


const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload";
const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";


export default function FileUpload() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const onDrop = useCallback(async (acceptedFiles) => {
        if (!acceptedFiles.length) return;

        const file = acceptedFiles[0];
        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            setUploadedFile(response.data.secure_url);
        } catch (err) {
            setError("File upload failed.");
        } finally {
            setUploading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: false,
    });

    return <>
        <div
                {...getRootProps()}
                style={{
                    border: "2px dashed #ccc",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: isDragActive ? "#f0f0f0" : "white",
                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the file here...</p>
                ) : (
                    <p>Drag & drop an image here, or click to select one</p>
                )}
        </div>

            {uploading && <p>Uploading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {uploadedFile && (
                <div>
                    <p>Uploaded Image:</p>
                    <img src={uploadedFile} alt="Uploaded" width="200" />
                </div>
            )}     
    </>
}
