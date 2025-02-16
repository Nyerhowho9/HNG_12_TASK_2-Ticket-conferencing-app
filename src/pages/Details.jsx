import React, {useState, useEffect, useCallback} from "react";

import { useNavigate } from 'react-router-dom'
import { useDropzone } from "react-dropzone";
import NavBar from "../components/NavBar";
import Headng from "../components/Heading";
import ProgressBar from "../components/ProgressBar";
import cloud from '../assets/cloud.png'
import styles from '../styles/Details.module.css'
import axios from 'axios'


const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export default function Details() {


    const navigate = useNavigate();
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem("formData");
        return savedData ? JSON.parse(savedData) : {
            fullName: "",
            email: "",
            avatar: "",
            aboutProject: ""
        };
    });
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    
    useEffect(() => {
        const savedData = localStorage.getItem("formData");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

  

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "aboutProject") {
            const lines = value.split("\n");
            if (lines.length > 3) return; // Prevent more than 3 rows
        }
        
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);
        localStorage.setItem("formData", JSON.stringify(updatedData));
    };
    
    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;
        
        console.log("Uploading file:", file.name); //debugging

        setUploading(true); // Indicate uploading
        const formDataCloudinary = new FormData();
        formDataCloudinary.append("file", file);
        formDataCloudinary.append("upload_preset", CLOUDINARY_UPLOAD_PRESET); // Replace with Cloudinary preset
    
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                formDataCloudinary
            );

            console.log("Cloudinary Response:", response.data); // Debugging


            const imageUrl = response.data.secure_url;
    
            setFormData((prev) => ({ ...prev, avatar: imageUrl })); // Store Cloudinary URL
            setAvatarPreview(imageUrl); // Update preview inside drop zone
            setUploading(false);
        } catch (error) {
            console.error("Upload error:", error);
            setErrors((prev) => ({ ...prev, avatar: "Failed to upload avatar" }));
            setUploading(false);
        }
    };
    
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" });


  
    

    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) newErrors.email = "Invalid email format";
        if (!formData.avatar) newErrors.avatar = "Avatar is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted Successfully!", formData);

            navigate("/ready", { state: { formData } }); 
        }
    };
   
    
    return<>
        <NavBar/>
        <div  className={styles.container}>
            <Headng title="Attendee Details" steps="Step 2/3"/>
            <div  className={styles.progressContainer}>
                <div className={styles.progressBar}>
                    <div className={styles.progress}></div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                <div className={styles.imgContainer}>
                    <label htmlFor="avatar" className={styles.avatarLabel}>Upload Profile Photo</label>
                    <div className={styles.plainBg}>
                        <div {...getRootProps()} className={styles.dropZone}
                         tabIndex={0}
                         role="button"
                         aria-label="Upload your profile photo"
                         onKeyDown={(e) => {
                             if (e.key === "Enter" || e.key === " ") getInputProps().onClick();
                         }}>
                            <input {...getInputProps() }
                            aria-hidden="true"  
                            />
                            <div className={styles.cloud}>
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Uploaded Avatar" className={styles.avatarPreview} />
                                ) : (
                                    <>
                                        <img src={cloud} alt="Cloud icon" />
                                        {isDragActive ? <p>Drop the file here...</p> : <p>Drag & drop or click to upload</p>}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ProgressBar/>
                <div className={styles.nameContainer}>
                    <label htmlFor="name" className={styles.nameLabel}> Enter your name:</label>
                    <br />
                    <input type="text" id="name" name="fullName" value={formData.fullName}
                     onChange={handleChange} className={styles.name} 
                     aria-describedby="name-error"
                     />
                     {errors.fullName && <p id="name-error" className={styles.error}>{errors.fullName}</p>}
                </div>
                <div className={styles.emailContainer}>
                    <label htmlFor="email" className={styles.emailLabel}>Email Address:</label>
                    <input type="email" id="email" name="email" value={formData.email} 
                    onChange={handleChange}  className={styles.email} placeholder="hello@avioflagos.io"
                    aria-describedby="email-error"/>
                    {errors.email && <p id="email-error"  className={styles.error}>{errors.email}</p>}
                </div>

                <div className={styles.aboutContainer}>
                    <label htmlFor="about" className={styles.about}>Special Request?</label>
                    <br />
                    <textarea
                        id="about"
                        name="aboutProject"
                        value={formData.aboutProject}
                        onChange={handleChange}
                        rows="3"
                        className={styles.textarea}
                        placeholder="Textarea"
                        aria-describedby="about-error"

                    />
                </div>

           
                <div className={styles.buttonContainer}>
                    <button className={styles.button1} type="submit" disabled={uploading}
                        aria-label="Submit form and get your free ticket"  
                    >
                            {uploading ? "Uploading..." : "Get My Free Ticket"}
                    </button>               
                    <button className={styles.button2} onClick={() => navigate(-1)}
                      aria-label="Go back to the previous page"
                    >
                        Back
                    </button>
                </div>
            </form>
     </div>
    </>
}