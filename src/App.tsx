import { BrowserRouter, Route, Routes } from "react-router-dom";
// import先のexportの仕方によって表現が異なる
// default exportの記述があれば{}で囲む必要はない
import Layout from "./Layout";
// named export(export function 関数名 など)は{}で囲む必要がある
import { Home } from "./pages/Home";
import NoteDetail from "./pages/NoteDetail.tsx";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="h-full">
        <Routes>
          {/* 入れ子で表示することで、共通のレイアウトを適用できる */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/note/:id" element={<NoteDetail />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
