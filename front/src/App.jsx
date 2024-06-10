import "./App.scss"; 
import { RouterProvider } from "react-router"; 
import { router } from "./Router"; 
// import { ExplorerContext } from "./contexts/context"; 
 

function App() {
  return <>
      
      {/* <ExplorerContext.Provider value={{ web3: web3 }}>
        <RouterProvider router={router} />
      </ExplorerContext.Provider> */}
      <RouterProvider router={router} />

  </>
}

export default App;
