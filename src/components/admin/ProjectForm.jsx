import { useState, useCallback } from "react";
import { useProjects } from "../../context/ProjectContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";

const projectSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  category: Yup.string().required("Category is required"),
  images: Yup.array().min(1, "At least one image is required"),
  technologies: Yup.string().required("At least one technology is required"),
  liveUrl: Yup.string().url("Must be a valid URL"),
  githubUrl: Yup.string().url("Must be a valid URL"),
  featured: Yup.boolean(),
  status: Yup.string()
    .oneOf(["unpublished", "published"])
    .required("Status is required"),
});

export default function ProjectForm({ project, onSuccess }) {
  const { addProject, updateProject } = useProjects();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImages, setUploadedImages] = useState(project?.images || []);

  const handleImageUpload = useCallback(
    async (e, setFieldValue) => {
      const files = Array.from(e.target.files);

      try {
        const uploadPromises = files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "portfolio-project-image-preset"); // Replace with your Cloudinary upload preset
          formData.append("folder", "Portfolio");

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/dfoeedczp/image/upload`, // Replace with your cloud name
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          return data.secure_url;
        });

        const newImageUrls = await Promise.all(uploadPromises);
        const updatedImages = [...uploadedImages, ...newImageUrls];
        setUploadedImages(updatedImages);
        setFieldValue("images", updatedImages);
      } catch (error) {
        setError("Failed to upload images. Please try again.");
      }
    },
    [uploadedImages]
  );

  const removeImage = useCallback(
    (indexToRemove, setFieldValue) => {
      const updatedImages = uploadedImages.filter(
        (_, index) => index !== indexToRemove
      );
      setUploadedImages(updatedImages);
      setFieldValue("images", updatedImages);
    },
    [uploadedImages]
  );

  const initialValues = project
    ? {
        ...project,
        technologies: Array.isArray(project.technologies)
          ? project.technologies.join(", ")
          : project.technologies,
        images: project.images || [],
      }
    : {
        title: "",
        description: "",
        category: "Web Development",
        images: [],
        technologies: "",
        liveUrl: "",
        githubUrl: "",
        featured: false,
        status: "unpublished",
      };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formattedData = {
        ...values,
        technologies: values.technologies.split(",").map((tech) => tech.trim()),
        images: values.images,
        image: values.images[0], // Set first image as main thumbnail
      };

      if (project) {
        await updateProject(project._id, formattedData);
      } else {
        await addProject(formattedData);
      }

      onSuccess?.();
    } catch (error) {
      setError(error.message || "Failed to save project. Please try again.");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={projectSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, getFieldProps, setFieldValue, isValid }) => (
        <Form className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 text-sm text-red-600 bg-red-50 rounded-md"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Project Title
            </label>
            <Field
              type="text"
              id="title"
              {...getFieldProps("title")}
              className={`w-full p-2 border rounded-md ${
                errors.title && touched.title
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.title && touched.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              rows="4"
              {...getFieldProps("description")}
              className={`w-full p-2 border rounded-md ${
                errors.description && touched.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.description && touched.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium mb-2"
            >
              Category
            </label>
            <Field
              as="select"
              id="category"
              {...getFieldProps("category")}
              className="w-full p-2 border rounded-md"
            >
              <option value="Web Development">Web Development</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </Field>
            {errors.category && touched.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="images" className="block text-sm font-medium mb-2">
              Project Images
            </label>
            <div className="space-y-4">
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index, setFieldValue)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-gray-400">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload images
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                  />
                </label>
              </div>
            </div>
            {errors.images && touched.images && (
              <p className="mt-1 text-sm text-red-600">{errors.images}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="technologies"
              className="block text-sm font-medium mb-2"
            >
              Technologies (comma-separated)
            </label>
            <Field
              type="text"
              id="technologies"
              {...getFieldProps("technologies")}
              className={`w-full p-2 border rounded-md ${
                errors.technologies && touched.technologies
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="React, Node.js, MongoDB"
            />
            {errors.technologies && touched.technologies && (
              <p className="mt-1 text-sm text-red-600">{errors.technologies}</p>
            )}
          </div>

          <div>
            <label htmlFor="liveUrl" className="block text-sm font-medium mb-2">
              Live URL
            </label>
            <Field
              type="url"
              id="liveUrl"
              {...getFieldProps("liveUrl")}
              className={`w-full p-2 border rounded-md ${
                errors.liveUrl && touched.liveUrl
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.liveUrl && touched.liveUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.liveUrl}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="githubUrl"
              className="block text-sm font-medium mb-2"
            >
              GitHub URL
            </label>
            <Field
              type="url"
              id="githubUrl"
              {...getFieldProps("githubUrl")}
              className={`w-full p-2 border rounded-md ${
                errors.githubUrl && touched.githubUrl
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.githubUrl && touched.githubUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.githubUrl}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <Field
                type="checkbox"
                name="featured"
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium">Featured Project</span>
            </label>

            <label className="flex items-center gap-2">
              <Field
                type="radio"
                name="status"
                value="unpublished"
                className="border-gray-300"
              />
              <span className="text-sm font-medium">Unpublished</span>
            </label>

            <label className="flex items-center gap-2">
              <Field
                type="radio"
                name="status"
                value="published"
                className="border-gray-300"
              />
              <span className="text-sm font-medium">Published</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </span>
            ) : project ? (
              "Update Project"
            ) : (
              "Add Project"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
