"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-950 text-black dark:text-white flex flex-col">
        {/* Main Content - Centered */}
        <div className="flex-1 flex items-center justify-center px-4 py-20 md:py-12 ">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 pt-24">
              Get in Touch
            </h1>

            {sent ? (
              /* Success Message with Images */
              <div className="relative">
                {/* Background Overlay */}
                <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40" onClick={() => setSent(false)} />
                
                {/* Success Card */}
                <div className="relative z-50 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-[#5b42f5] mx-auto max-w-xl">
                  {/* Left Image */}
                  <div className="absolute -left-8 md:-left-16 bottom-8 md:bottom-12 w-20 h-20 md:w-32 md:h-32 z-10">
                    <Image
                      src="/images/img_herbie-nation.png"
                      fill
                      className="object-contain"
                      alt="Herbie"
                    />
                  </div>

                  {/* Right Image */}
                  <div className="absolute -right-8 md:-right-16 bottom-8 md:bottom-12 w-20 h-20 md:w-32 md:h-32 z-10">
                    <Image
                      src="/images/img_fantastic.png"
                      fill
                      className="object-contain"
                      alt="Fantastic"
                    />
                  </div>

                  {/* Success Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Success Text */}
                  <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                    Thank you and message received!
                  </h2>
                  <p className="text-center text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                    My AI assistant will notify me and I will get back to you as soon as possible!
                  </p>

                  {/* Close Button */}
                  <button
                    onClick={() => setSent(false)}
                    className="mt-8 w-full bg-[#5b42f5] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4a35d4] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <div className="bg-gray-50 dark:bg-slate-900 rounded-3xl shadow-xl p-6 md:p-10 lg:p-12 border-2 border-gray-200 dark:border-slate-700">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-black dark:text-white p-3 md:p-4 rounded-xl focus:border-[#5b42f5] focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-black dark:text-white p-3 md:p-4 rounded-xl focus:border-[#5b42f5] focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      placeholder="Your message..."
                      rows={6}
                      className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-black dark:text-white p-3 md:p-4 rounded-xl focus:border-[#5b42f5] focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#5b42f5] text-white px-6 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-[#4a35d4] transition-colors shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Social Links - Bottom Center */}
        <div className="py-8 flex justify-center items-center gap-6">
          <a
            href="https://www.linkedin.com/in/ralph-pablo-carbo-21b9213a3/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 md:w-14 md:h-14 hover:scale-110 transition-transform"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
              <path fill="#0076b2" d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"/>
              <path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"/>
            </svg>
          </a>

          <a
            href="https://github.com/RPCARBO"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 md:w-14 md:h-14 hover:scale-110 transition-transform"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-full h-full">
              <g fill="#181616" className="dark:fill-white">
                <path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"/>
                <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"/>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}