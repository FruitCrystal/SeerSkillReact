import { Button, Empty } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Overlay, Search } from 'react-vant';
import SearchOption from '../../components/SearchOption';
import SkillPanel from '../../components/SkillPanel';
import TypeEffect from '../../components/TypeEffective';
import './index.css';
function SearchByTypeAndEffect() {
	const [option, setOption] = useState({ order: 'Power', isAsc: false });
	const [visible, setVisible] = useState(false);
	const [search, setSearch] = useState('');
	const [effectList, setEffectList] = useState([]);
	const [type, setType] = useState('草');
	const [active, setActive] = useState(0);
	const [effectID, setEffectID] = useState('');
	const [skillList, setSkillList] = useState([]);
	useEffect(() => {
		if (search) {
			axios.get(`/effect/getEffectByDes?des=${search}`).then((res) => {
				setEffectList(res.data);
				//console.log(res.data)
				setEffectID(res.data[0].id)
			});
		} else {
			return () => {};
		}
	}, [search]);
	useEffect(() => {
		if (search && type) {
			axios.get(`/getSkillByEffectAndType?id=${effectID}&type=${type}`).then((res) => {
				setSkillList(res.data);
				console.log(res.data);
			});
		}
	}, [type, effectID]);
	return (
		<div className="container">
			<div className="search">
				<div style={{ display: 'flex', backgroundColor: '#fff', alignItems: 'center' }}>
					<Search
						style={{ width: 150 }}
						onSearch={(v) => {
							setSearch(v);
							console.log(v);
						}}
					/>

					<SearchOption
						passValue={(value) => {
							setOption(value);
							console.log(option);
						}}
					/>
					<Button
						type="primary"
						onClick={() => {
							setVisible(true);
						}}
					>
						选择属性
					</Button>
					{type ? <p>已选择：{type}</p> : null}
				</div>
			</div>
			<div className="main">
				<div className="effects" style={{ height: search ? '880px' : '0px' }}>
					<ul>
						{effectList.length
							? effectList.map((item, index) => (
									<li
										key={index}
										onClick={() => {
											setActive(index);
											setEffectID(item.id);
										}}
									>
										<p style={{ display: active === index ? 'inline' : 'none' }}>⭐</p>
										{item.id}: {item.des}
									</li>
							))
							: null}
					</ul>
				</div>

				<Overlay
					visible={visible}
					onClick={() => {
						setVisible(false);
					}}
				>
					<TypeEffect
						passValue={(value) => {
							setType(value);
							setVisible(false);
						}}
					/>
				</Overlay>

				<div className="result-panel" style={{ display: 'flex', flexWrap: 'wrap' }}>
					{!search ? (
						<Empty description="请输入要查询的技能效果与属性"></Empty>
					) : (
						skillList.map((item) => (
							<SkillPanel
								key={item.id}
								shuxing={item.type}
								name={item.name}
								power={item.power}
								pp={item.maxPP}
								des={item.des}
								category={item.category}
								priority={item.priority}
								id={item.id}
								accuracy={item.accuracy}
								critRate={item.critRate}
								petsName={item.petsName}
							/>
						))
					)}
					{!skillList.length>0 && search? <Empty description="无查询结果"></Empty>:null}
				</div>
			</div>
		</div>
	);
}

export default SearchByTypeAndEffect;
