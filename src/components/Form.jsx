import React, { useState, useCallback} from "react";
import { useEffect } from 'react' 
import ProgressBar from "./ProgressBar";
import styles from '../styles/Form.module.css'



export default function Form({ onSubmit }) {
   
        const [formData, setFormData] = useState({
            fullName: "",
            email: "",
            avatar: "",
            aboutProject: ""
        });
        const [avatarPreview, setAvatarPreview] = useState(null);
        const [errors, setErrors] = useState({});
    
        useEffect(() => {
            const savedData = localStorage.getItem("formData");
            if (savedData) {
                setFormData(JSON.parse(savedData));
            }
        }, []);
    
        useEffect(() => {
            localStorage.setItem("formData", JSON.stringify(formData));
        }, [formData]);
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            
            if (name === "aboutProject") {
                const lines = value.split("\n");
                if (lines.length > 3) return; // Prevent more than 3 rows
            }
            
            setFormData({ ...formData, [name]: value });
        };
    
        const handleAvatarUpload = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAvatarPreview(reader.result);
                    setFormData({ ...formData, avatar: reader.result });
                };
                reader.readAsDataURL(file);
            }
        };
    
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
                onSubmit(formData);
            }
        }
    

    return 
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.imgContainer}>
                <p>Upload Profile Photo</p>

            </div>
            <ProgressBar/>
            <div>
                <label>Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}

                <label>Email Address:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p className={styles.error}>{errors.email}</p>}

                <label>Avatar Upload:</label>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} />
                {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className={styles.avatarPreview} />}
                {errors.avatar && <p className={styles.error}>{errors.avatar}</p>}

                <label>About Project:</label>
                <textarea
                    name="aboutProject"
                    value={formData.aboutProject}
                    onChange={handleChange}
                    rows="3"
                    className={styles.textarea}/>
            </div>
        </form>    

    
}