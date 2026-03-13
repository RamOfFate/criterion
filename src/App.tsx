import { Link, Route, Routes } from "react-router-dom"
import StreamerList from "./components/StreamerList"
import { buttonVariants } from "./components/ui/button"
import AddStreamer from "./components/AddStreamer"
import EditStreamer from "./components/EditStreamer"
import StreamerDetails from "./components/StreamerDetails"
import NotFound from "./components/NotFound"
import StreamerCardList from "./components/StreamerCardList"
import CheatSheet from "./components/CheatSheet"

console.log("App Loaded")

export function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <nav className="flex items-center justify-between border-b pb-4">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Criterion
          </Link>
          <div className="flex gap-4">
            <Link
              to="/cheat-sheet"
              className={buttonVariants({ variant: "ghost" })}
            >
              Docs
            </Link>
            {/* <Link
              to="/streamers-card"
              className={buttonVariants({ variant: "ghost" })}
            >
              StreamerCards
            </Link> */}
            <Link
              to="/streamers"
              className={buttonVariants({ variant: "ghost" })}
            >
              Streamers
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/cheat-sheet" element={<CheatSheet />} />
          <Route path="/streamers" element={<StreamerList />} />
          <Route path="/streamers-card" element={<StreamerCardList />} />
          <Route path="/streamers/add" element={<AddStreamer />} />
          <Route path="/streamers/edit/:id" element={<EditStreamer />} />
          <Route path="/streamers/:id" element={<StreamerDetails />} />
          <Route
            path="*"
            element={
              <div className="flex justify-center">
                <NotFound />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
