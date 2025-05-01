import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import ContactInfo from "../../components/portfolio/ContactInfo";
import { sendEmail } from "../../api";
import Button from "../../components/common/Button";
import { useEffect } from "react";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

export default function Contact() {
  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    try {
      const response = await sendEmail(values);

      if (!response.success) {
        throw new Error(response.data.message || "Failed to send message");
      }

      resetForm();
      setStatus({
        success: "Message sent successfully! I'll get back to you soon.",
      });
    } catch (error) {
      setStatus({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (status?.success || status?.error) {
      const timer = setTimeout(() => {
        setStatus({});
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="container mx-auto px-4 py-36 bg-[_#02071E] text-white">
      <div className="grid md:grid-cols-2 gap-12">
        <ContactInfo />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6">Send me a message</h2>
          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={contactSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, status }) => (
              <Form className="space-y-6">
                {status?.error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                    {status.error}
                  </div>
                )}
                {status?.success && (
                  <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
                    {status.success}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder=""
                    className={`w-full p-2 border-none  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-200 placeholder:text-gray-300 text-gray-300 bg-[#080D26] ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.name && touched.name && (
                    <div className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full p-2 border-none  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-200 placeholder:text-gray-300 text-gray-300 bg-[#080D26] ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.email && touched.email && (
                    <div className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows="5"
                    className={`w-full p-2 border-none  rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-200 placeholder:text-gray-300 text-gray-300 bg-[#080D26] ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.message && touched.message && (
                    <div className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  isDisabled={isSubmitting}
                  classes={
                    "disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center"
                  }
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
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
}
