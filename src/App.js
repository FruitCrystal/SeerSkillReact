import { Route, Routes, HashRouter, Link } from 'react-router-dom';
import './App.css';
import './SkillPanel.css';
import RandomSearch from './pages/RandomSearch';
import Detail from './components/Detail';
import SearchByType from './pages/SearchByType';
import './static/style/sider.css';
// import TypePanel from './components/TypePanel';
import Home from './pages/Home';
import SearchByName from './pages/SearchByName';
import DIYSkill from './pages/DiySkill/DIYSkill';
import { useState } from 'react';
import SkillLib from './pages/SkillLib';
import SearchByPet from './pages/SearchByPet';
import Effect from './pages/Effect';
import SearchByEffect from './pages/SearchByEffect';
//import TypeEffect from './components/TypeEffective';
import Restraint from './pages/Restraint';
import SearchByTypePlus from './pages/SearchByTypePlus';
import SearchByTypeAndEffect from './pages/SearchByTypeAndEffect/SearchByTypeAndEffect.jsx';
import CollectSkills from './pages/CollectSkills/CollectSkill';
function App() {
	const [active, setActive] = useState(1);
	return (
		<HashRouter>
			<div id="main">
				<div className="Sidebar">
					<ul
						onClick={e => {
							setActive(e.target.getAttribute('data-index'));
							console.log(e.target.getAttribute('data-index'));
						}}
					>
						<li className={active == 1 ? 'active' : 'unactive'}>
							<Link data-index={1} to="/">
								首页
							</Link>
						</li>
						<li className={active == 2 ? 'active' : 'unactive'}>
							<Link data-index={2} to="/random">
								随机查找
							</Link>
						</li>
						<li className={active == 3 ? 'active' : 'unactive'}>
							<Link data-index={3} to="/SearchByTypePuls">
								按属性查找
							</Link>
						</li>
						<li className={active == 4 ? 'active' : 'unactive'}>
							<Link data-index={4} to="/searchByName">
								按名称查找
							</Link>
						</li>
						<li className={active == 5 ? 'active' : 'unactive'}>
							<Link data-index={5} to="/DiySkill">
								自定义技能
							</Link>
						</li>
						<li className={active == 6 ? 'active' : 'unactive'}>
							<Link data-index={6} to="/SearchByPet">
								按精灵查找
							</Link>
						</li>
						<li className={active == 7 ? 'active' : 'unactive'}>
							<Link data-index={7} to="/Effect">
								技能效果
							</Link>
						</li>
						<li className={active == 8 ? 'active' : 'unactive'}>
							<Link data-index={8} to="/Restraint">
								属性克制
							</Link>
						</li>
						<li className={active == 9 ? 'active' : 'unactive'}>
							<Link data-index={9} to="/SearchByTypePuls">
								连续查找
							</Link>
						</li>
						<li className={active == 11 ? 'active' : 'unactive'}>
							<Link data-index={11} to="/SearchEffect">
								查找特定技能
							</Link>
						</li>
						<li className={active == 10 ? 'active' : 'unactive'}>
							<Link data-index={10} to="/Collect">
								收藏技能
							</Link>
						</li>
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
					<Route path="/searchByEffect/:id" element={<SearchByEffect />} />;
					<Route path="/Restraint" element={<Restraint />} />;
					<Route path="/SearchByTypePuls" element={<SearchByTypePlus />} />;
					<Route path="/SearchEffect" element={<SearchByTypeAndEffect />} />;
					<Route path="/Collect" element={<CollectSkills />} />;
				</Routes>
			</div>
		</HashRouter>
	);
}

export default App;
