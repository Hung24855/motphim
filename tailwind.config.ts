import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                primary: "#e4d804",
                res: "#772727",
                bg_primary: "#030A1B",
                admin_primary: "#7c69ef",
                text_link: "#0067B6"
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
            },
            keyframes: {
                "fade-in-down": {
                    "0%": {
                        opacity: "0",
                        transform: "translate(-50%,-10px)"
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translate(-50%,0)"
                    }
                },
                "zoom-in": {
                    "0%": {
                        transform: "scale(0)"
                    },
                    "100%": {
                        transform: "scale(1)"
                    }
                },
                typing: {
                    "0%": {
                        width: "0"
                    },
                    "100%": {
                        width: "100%"
                    }
                }
            },
            animation: {
                "fade-in-down": "fade-in-down 0.2s ease-out",
                "zoom-in": "zoom-in 0.3s ease-out",
                "typing-text": "typing 2.5s infinite"
            }
            // screens: {
            //     mob: "320px", // mobile - default - main support at 384px
            //     mobx: "480px", // mobile

            //     tab: "640px", // small table,
            //     tabx: "768px", // medium table - main support break point
            //     tabxx: "960px", // large table

            //     lap: "1024px", // small laptop,
            //     lapx: "1280px" // medium laptop - main support break point
            // },
        }
    }
};
export default config;
