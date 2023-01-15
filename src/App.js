import { RouterProvider } from "react-router-dom";
import { router } from './Routes/router';

function App() {
  return (
    <div className="w-[1440px] mx-auto ">
       <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
