import{j as e,a as r,d as s}from"./app-BXrArFBs.js";import"./index-NDvWyOIA.js";function l({auth:t,phpVersion:i}){return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Welcome"}),e.jsxs("div",{className:"relative sm:flex sm:justify-center sm:items-center min-h-screen animate-gradient",children:[e.jsx("div",{className:"sm:fixed sm:top-0 sm:right-0 p-6 text-end",children:t.user?e.jsx(s,{href:route("dashboard"),className:"font-semibold text-orange-400 mr-4 hover:no-underline",children:"Dashboard"}):e.jsxs(e.Fragment,{children:[e.jsx(s,{href:route("login"),className:"font-semibold text-gold mr-4 hover:no-underline",children:"Log in"}),e.jsx(s,{href:route("register"),className:"font-semibold text-gold hover:no-underline",children:"Register"})]})}),e.jsxs("div",{className:"max-w-7xl mx-auto p-6 lg:p-8",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("h1",{className:"text-3xl font-bold text-center text-gold",children:"Around the World!"}),e.jsx("p",{className:"text-2xl font-bold text-center text-gold",children:"Viaggia, vivi, ama"})]}),e.jsx("div",{className:"mt-16",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"})}),e.jsx("div",{className:"flex justify-center mt-16 px-6 sm:items-center sm:justify-between",children:e.jsx("div",{className:"text-center text-sm sm:text-start",children:" "})})]})]}),e.jsxs("footer",{className:"text-center py-4 bg-gray-200 text-sm",children:["© 2024 Giuseppe Sansone. Tutti i diritti riservati. - PHP versione ",i]}),e.jsx("style",{children:`
                .animate-gradient {
                    background: linear-gradient(45deg, #1a237e 0%, #1565c0 33%, #ffffff 67%);
                    background-size: 400% 400%;
                    animation: gradientAnimation 5s ease infinite;
                }

                @keyframes gradientAnimation {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `})]})}export{l as default};
