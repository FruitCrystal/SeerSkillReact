import {Route, Routes, BrowserRouter, Link} from 'react-router-dom';
import './App.css';
import './SkillPanel.css';
import RandomSearch from './pages/RandomSearch';
import Detail from './pages/Detail';
import SearchByType from './pages/SearchByType';
import './static/style/sider.css';
// import TypePanel from './components/TypePanel';
import Home from './pages/Home';
import SearchByName from './pages/SearchByName';
import DIYSkill from './pages/DIYSkill';
import { useState } from 'react';
import SkillLib from './pages/SkillLib';
import SearchByPet from "./pages/SearchByPet";
import Effect from "./pages/Effect";
function App () {
  const [active,setActive]=useState(1);
  return (
    <BrowserRouter>
      <div id="main">
        <div className="Sidebar">
          <ul onClick={(e)=>{
            setActive(e.target.getAttribute("data-index"))
            console.log(e.target.getAttribute("data-index"))
          }}>
            <li className={active==1? "active":'unactive'}><Link data-index={1} to="/">首页</Link></li>
            <li className={active==2? "active":'unactive'}><Link data-index={2} to="/random">随机查找</Link></li>
            <li className={active==3? "active":'unactive'}><Link data-index={3} to="/searchByType">按属性查找</Link></li>
            <li className={active==4? "active":'unactive'}><Link data-index={4} to="/searchByName">按名称查找</Link></li>
            <li className={active==5? "active":'unactive'}><Link data-index={5} to="/DiySkill">自定义技能</Link></li>
            <li className={active==6? "active":'unactive'}><Link data-index={6} to="/SearchByPet">按精灵查找</Link></li>
            <li className={active==7? "active":'unactive'}><Link data-index={7} to="/Effect">技能效果</Link></li>
            <li className={active==8? "active":'unactive'}><Link data-index={8} to="/SkillLib">施工中</Link></li>
            <li className={active==9? "active":'unactive'}><Link data-index={9} to="/SkillLib">施工中</Link></li>
            <li className={active==11? "active":'unactive'}><Link data-index={11} to="/SkillLib">施工中</Link></li>
            <li className={active==10? "active":'unactive'}><Link data-index={10} to="/SkillLib">施工中</Link></li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/random" element={<RandomSearch />} />
          <Route path="/detail" element={<Detail />} />;
          <Route path="/searchByType" element={<SearchByType />} />;
          <Route path="/searchByName" element={<SearchByName />} />;
          <Route path="/DiySkill" element={<DIYSkill />} />;
          <Route path="/SkillLib" element={<SkillLib />} />;
          <Route path="/SearchByPet" element={<SearchByPet />} />;
          <Route path="/Effect" element={<Effect />} />;
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
