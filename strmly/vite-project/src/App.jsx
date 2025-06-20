import Feed from "./screens/Feed"
import './App.css'
import BottomNav from "./components/BottomNav"

const App = () => {
  return (
    <div className="h-screen items-center w-screen flex flex-col bg-gray-900">
      <Feed/>
      <BottomNav/>
    </div>
  )
}

export default App