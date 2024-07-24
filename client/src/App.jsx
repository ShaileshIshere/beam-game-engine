import { 
  BrowserRouter, 
  Routes, 
  Route 
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { DashBoard } from "./pages/DashBoard"
import { OwnedGames } from "./pages/OwnedGames";
import { WishList } from "./pages/WishList";

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path='/ownedgames' element={<OwnedGames />} />
            <Route path='/wishlist' element={<WishList />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
