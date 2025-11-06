import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Let's Connect</h2>
      <p className="text-text-secondary font-josefin text-xl">
        I'm always open to discussing new projects, creative ideas, or
        opportunities to be part of your visions.
      </p>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <svg
            className="w-6 h-6 text-brand"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span>udayrana428@gmail.com</span>
        </div>
        <div className="flex items-center gap-4">
          <svg
            className="w-6 h-6 text-brand"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Mangalmurthi Square, Nagpur, Maharashtra. 440022</span>
        </div>
      </div>
      <div className="flex gap-4">
        <a
          href="https://github.com/udayrana428"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-brand"
        >
          <FaGithub className="mr-1 inline-block" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/uday-rana-678879193/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-brand"
        >
          <FaLinkedin className="mr-1 inline-block" />
          LinkedIn
        </a>
        <a
          href="https://x.com/udayrana428"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-brand"
        >
          <FaTwitter className="mr-1 inline-block" />
          Twitter
        </a>
      </div>
    </div>
  );
}
