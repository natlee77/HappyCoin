import {
  createBrowserRouter
} from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import BlockChain from "./pages/BlockChain";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import MineBlock  from  "./pages/MineBlock";
import SendCoint from "./pages/SendCoint";

export const router = createBrowserRouter([{
  path: "/",
  element: < Layout / > ,
  errorElement: < NotFound / > ,
  children: [{
      index: true,
      element: < Home / > ,
    },
    {
      path: "/contact",
      element: < Contact / > ,
    },
    {
      path: "/blockchain",
      element: < BlockChain / > ,
    },
    {
      path: "/mine",
      element: < MineBlock / > ,
    },
    {
      path: "/send",
      element: < SendCoint / > ,
    },
    
  ],
}, ]);