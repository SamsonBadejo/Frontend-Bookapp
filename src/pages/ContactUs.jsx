import React from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <section className="bg-brown-900 dark:bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p
            className="text-orange-500 dark:text-orange-400 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.p>
          <motion.h1
            className="text-3xl md:text-4xl font-semibold text-white dark:text-gray-200"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            className="mt-3 text-gray-300 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our friendly team is always here to chat.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            className="p-6 bg-orange-500 dark:bg-brown-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block p-3 text-white rounded-full bg-white dark:bg-orange-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-orange-500 dark:text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </span>
            <h2 className="text-lg font-medium text-white dark:text-gray-200 mb-2">
              Email
            </h2>
            <p className="text-white dark:text-gray-400">
              Our friendly team is here to help.
            </p>
            <p className="text-white dark:text-orange-400 mt-2">
              Zwitsam8@gmail.com
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-orange-500 dark:bg-brown-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block p-3 text-white rounded-full bg-white dark:bg-orange-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-orange-500 dark:text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3c-4.418 0-8 3.582-8 8 0 3.534 2.293 6.516 5.469 7.565.4.074.548-.172.548-.382v-1.396c-2.226.485-2.697-1.074-2.697-1.074-.365-.925-.892-1.17-.892-1.17-.728-.496.055-.486.055-.486.806.057 1.23.828 1.23.828.714 1.213 1.87.862 2.323.662.073-.516.28-.862.509-1.062-1.777-.202-3.644-.888-3.644-3.946 0-.872.312-1.588.826-2.148-.082-.202-.359-1.014.079-2.113 0 0 .671-.215 2.198.82.635-.177 1.319-.266 1.999-.268.678.002 1.364.091 2.001.268 1.526-1.034 2.198-.82 2.198-.82.438 1.098.161 1.91.079 2.113.515.56.826 1.276.826 2.148 0 3.061-1.872 3.748-3.657 3.947.288.248.553.736.553 1.482v2.197c0 .213.146.458.553.379C18.713 17.516 21 14.534 21 11c0-4.418-3.582-8-8-8z"
                />
              </svg>
            </span>
            <h2 className="text-lg font-medium text-white dark:text-gray-200 mb-2">
              GitHub
            </h2>
            <p className="text-gray-200 dark:text-gray-400">
              Check out our GitHub profile for more information.
            </p>
            <p className="text-white dark:text-orange-400 mt-2">
              https://github.com/SamsonBadejo
            </p>
          </motion.div>

          <motion.div
            className="p-6 bg-orange-500 dark:bg-brown-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block p-3 text-white rounded-full bg-white dark:bg-orange-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-orange-500 dark:text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </span>
            <h2 className="text-lg font-medium text-white dark:text-gray-200 mb-2">
              Phone
            </h2>
            <p className="text-gray-200 dark:text-gray-400">
              Mon-Fri from 8am to 5pm.
            </p>
            <p className="text-white dark:text-orange-400 mt-2">
              +234 111 1111 111
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
