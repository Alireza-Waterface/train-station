/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         // We can extend colors here later if needed to match PANTO branding
         colors: {
            brand: {
               50: "#f0f9ff",
               500: "#0ea5e9",
               900: "#0c4a6e",
            },
         },
      },
   },
   plugins: [],
};
