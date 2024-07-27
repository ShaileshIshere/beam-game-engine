import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { DashBoard } from "./pages/DashBoard"

function App() {

  return (
    <>
      <RecoilRoot>
        <Router basename="beam-game-engine-client.vercel.app/">
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/dashboard' element={<DashBoard />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  )
}

export default App