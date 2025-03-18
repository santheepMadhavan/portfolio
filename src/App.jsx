import './App.css'
import Header from './components/header/header'
import About from './components/about/about'
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router";
import Work from './components/work/work';
import Project from './components/project/project';

function App() {

  return (
    <div className='flex p-8 h-screen justify-center bg-gray-100'>
      <div className='xl:w-4/6 w-full max-w-[1050px] border-8 rounded-4xl overflow-auto sm:p-8 p-4 px-8 sm:px-12 border-white bg-[#f5f5f5]'>
        <HashRouter>
        <Header />
          <Routes>
            {/* <Route  element={<About />} /> */}
            <Route path="/" index element={<Navigate to="/about" replace />} /> 
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:title" element={<Project />} />
            <Route path="/*" element={<Navigate to="/about" replace />} />
          </Routes>
        </HashRouter>

      </div>
    </div>
  )
}

export default App
