import { useState, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import {
  useCreateProject,
  useUpdateProject,
} from "../../hooks/projects/useProjects";

// ✅ Validation Schema (aligned with backend)
const projectSchema = Yup.object().shape({
  title: Yup.string().min(3).required("Title is required"),
  description: Yup.string().min(10).required("Description is required"),
  category: Yup.string().required("Category is required"),
  techStack: Yup.string().required("At least one tech stack item is required"),
  tags: Yup.string(),
  mainImage: Yup.mixed().test(
    "required",
    "Main image is required",
    function (value) {
      // allow URL or File
      return value && (typeof value === "string" || value instanceof File);
    }
  ),
  subImages: Yup.array(),
  githubUrl: Yup.string().url("Must be a valid URL"),
  liveUrl: Yup.string().url("Must be a valid URL"),
  isFeatured: Yup.boolean(),
  isPublished: Yup.boolean(),
});

export default function ProjectForm({ project, onSuccess }) {
  // Mutation hooks
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Local state for images
  const [mainImage, setMainImage] = useState(project?.mainImage?.url || "");
  const [subImages, setSubImages] = useState(
    project?.subImages?.map((img) => img.url) || []
  );

  // ✅ Upload function (Cloudinary)
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio-project-image-preset");
    formData.append("folder", "Portfolio");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dfoeedczp/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url;
  };

  // ✅ Handle Main Image Upload
  const handleMainImageUpload = useCallback(async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setMainImage(url);
      setFieldValue("mainImage", url);
    } catch {
      setError("Failed to upload main image");
    }
  }, []);

  // ✅ Handle Sub Images Upload
  const handleSubImageUpload = useCallback(
    async (e, setFieldValue) => {
      const files = Array.from(e.target.files);
      try {
        const urls = await Promise.all(files.map((f) => uploadImage(f)));
        const updated = [...subImages, ...urls];
        setSubImages(updated);
        setFieldValue("subImages", updated);
      } catch {
        setError("Failed to upload images");
      }
    },
    [subImages]
  );

  const removeSubImage = (index, setFieldValue, values) => {
    const updatedFiles = values.subImages.filter((_, i) => i !== index);
    const updatedPreview = subImages.filter((_, i) => i !== index);

    setSubImages(updatedPreview);
    setFieldValue("subImages", updatedFiles);
  };

  // ✅ Initial Values
  const initialValues = project
    ? {
        ...project,
        techStack: Array.isArray(project.techStack)
          ? project.techStack.join(", ")
          : project.techStack || "",
        tags: Array.isArray(project.tags)
          ? project.tags.join(", ")
          : project.tags || "",
        mainImage: project.mainImage?.url || "",
        subImages: project.subImages?.map((i) => i.url) || [],
      }
    : {
        title: "",
        description: "",
        category: "frontend",
        techStack: "",
        tags: "",
        mainImage: null,
        subImages: [],
        githubUrl: "",
        liveUrl: "",
        isFeatured: false,
        isPublished: false,
      };

  const handleFileChange = (e, setFieldValue, fieldName) => {
    const files = Array.from(e.target.files);

    if (fieldName === "mainImage") {
      const file = files[0];
      setMainImage(URL.createObjectURL(file));
      setFieldValue("mainImage", file); // <-- single File, not array
    } else if (fieldName === "subImages") {
      setSubImages((prev) => [
        ...prev,
        ...files.map((f) => URL.createObjectURL(f)),
      ]);
      setFieldValue("subImages", files); // this can stay as array
    }
  };

  // ✅ Submit Handler
  const handleSubmit = async (values, { setSubmitting }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // const formattedData = {
      //   ...values,
      //   techStack: values.techStack.split(",").map((s) => s.trim()),
      //   tags: values.tags ? values.tags.split(",").map((s) => s.trim()) : [],
      //   mainImage: { url: values.mainImage },
      //   subImages: values.subImages.map((url) => ({ url })),
      // };

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);
      if (values.liveUrl) formData.append("liveUrl", values.liveUrl || "");
      if (values.githubUrl)
        formData.append("githubUrl", values.githubUrl || "");
      formData.append("isFeatured", values.isFeatured);
      formData.append("isPublished", values.isPublished);

      // Convert comma-separated fields
      const techStackArray = values.techStack.split(",").map((t) => t.trim());
      const tagsArray = values.tags.split(",").map((t) => t.trim());
      formData.append("techStack", JSON.stringify(techStackArray));
      formData.append("tags", JSON.stringify(tagsArray));

      // Files
      if (values.mainImage && values.mainImage instanceof File) {
        formData.append("mainImage", values.mainImage);
      }
      values.subImages?.forEach((item) => {
        if (item instanceof File) {
          formData.append("subImages", item);
        }
      });
      if (project) {
        await updateProject.mutateAsync({ projectId: project._id, formData });
      } else {
        await createProject.mutateAsync(formData);
      }

      onSuccess?.();
    } catch (err) {
      setError(err.message || "Failed to save project");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  // ✅ Form Layout
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={projectSchema}
      validateOnMount={false}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, getFieldProps, setFieldValue, isValid }) => (
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Error Banner */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-2 p-3 text-sm text-error bg-background rounded-md"
            >
              {error}
            </motion.div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm mb-2 font-medium">Title</label>
            <Field
              type="text"
              {...getFieldProps("title")}
              className={`w-full p-2 border-2 bg-background rounded-md ${
                errors.title && touched.title
                  ? "border-error"
                  : "border-surfaceAlt"
              }`}
            />
            {errors.title && touched.title && (
              <div className="mt-1 text-sm text-error">{errors.title}</div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-2 font-medium">Category</label>
            <Field
              as="select"
              {...getFieldProps("category")}
              className="w-full p-2 border-2 rounded-md bg-background border-surfaceAlt"
            >
              <option>Frontend</option>
              <option>Backend</option>
              <option>Fullstack</option>
            </Field>
            {errors.category && touched.category && (
              <div className="mt-1 text-sm text-error">{errors.category}</div>
            )}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm mb-2 font-medium">
              Description
            </label>
            <Field
              as="textarea"
              rows="4"
              {...getFieldProps("description")}
              className={`w-full p-2 border-2 bg-background rounded-md ${
                errors.description && touched.description
                  ? "border-error"
                  : "border-surfaceAlt"
              }`}
            />
            {errors.description && touched.description && (
              <div className="mt-1 text-sm text-error">
                {errors.description}
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm mb-2 font-medium">
              Tech Stack (comma-separated)
            </label>
            <Field
              type="text"
              {...getFieldProps("techStack")}
              placeholder="React, Node.js, MongoDB"
              className={`w-full p-2 border-2 bg-background rounded-md ${
                errors.techStack && touched.techStack
                  ? "border-error"
                  : "border-surfaceAlt"
              }`}
            />
            {errors.techStack && touched.techStack && (
              <div className="mt-1 text-sm text-error">{errors.techStack}</div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm mb-2 font-medium">
              Tags (comma-separated)
            </label>
            <Field
              type="text"
              {...getFieldProps("tags")}
              placeholder="Frontend, Portfolio"
              className="w-full p-2 border-2 rounded-md bg-background border-surfaceAlt"
            />
            {errors.tags && touched.tags && (
              <div className="mt-1 text-sm text-error">{errors.tags}</div>
            )}
          </div>

          {/* Main Image */}
          <div className="col-span-2">
            <label className="block text-sm mb-2 font-medium">Main Image</label>
            {mainImage ? (
              <div className="relative w-32">
                <img
                  src={mainImage}
                  alt="Main"
                  className="rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setMainImage("");
                    setFieldValue("mainImage", "");
                  }}
                  className="absolute top-1 right-1 bg-error text-white p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center border-2 border-dashed border-surfaceAlt p-4 rounded-lg cursor-pointer">
                <Upload className="w-6 h-6 text-gray-400" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    handleFileChange(e, setFieldValue, "mainImage")
                  }
                />
              </label>
            )}
            {errors.mainImage && touched.mainImage && (
              <div className="mt-1 text-sm text-error">{errors.mainImage}</div>
            )}
          </div>

          {/* Sub Images */}
          <div className="col-span-2">
            <label className="block text-sm mb-2 font-medium">Sub Images</label>
            <div className="flex flex-wrap gap-3">
              {subImages.map((url, i) => (
                <div key={i} className="relative">
                  <img
                    src={url}
                    className="w-24 h-24 rounded-md object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeSubImage(i, setFieldValue)}
                    className="absolute top-1 right-1 bg-error text-white p-1 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-surfaceAlt rounded-lg cursor-pointer">
                <Upload className="w-6 h-6 text-gray-400" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    handleFileChange(e, setFieldValue, "subImages")
                  }
                />
              </label>
              {errors.subImages && touched.subImages && (
                <div className="mt-1 text-sm text-error">
                  {errors.subImages}
                </div>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <label className="block text-sm mb-2 font-medium">GitHub URL</label>
            <Field
              type="url"
              {...getFieldProps("githubUrl")}
              className="w-full p-2 border-2 rounded-md bg-background border-surfaceAlt"
            />
            {errors.githubUrl && touched.githubUrl && (
              <div className="mt-1 text-sm text-error">{errors.githubUrl}</div>
            )}
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium">Live URL</label>
            <Field
              type="url"
              {...getFieldProps("liveUrl")}
              className="w-full p-2 border-2 rounded-md bg-background border-surfaceAlt"
            />
            {errors.liveUrl && touched.liveUrl && (
              <div className="mt-1 text-sm text-error">{errors.liveUrl}</div>
            )}
          </div>

          {/* Status */}
          <div className="col-span-2 flex items-center gap-6">
            <label className="flex items-center gap-2">
              <Field type="checkbox" name="isFeatured" />
              Featured
            </label>

            <label className="flex items-center gap-2">
              <Field type="checkbox" name="isPublished" />
              Published
            </label>
            {errors.name && touched.name && (
              <div className="mt-1 text-sm text-error">{errors.name}</div>
            )}
          </div>

          {/* Submit */}
          <div className="col-span-2">
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="btn border-2 border-surfaceAlt w-full disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : project
                ? "Update Project"
                : "Add Project"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
