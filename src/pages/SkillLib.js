import axios from 'axios';
import { useEffect, useState } from 'react';
import SkillPanel from '../components/SkillPanel';

function SkillLib(props) {
	// const [uSpdate,setUpdate] = useState(props.updateSolt? 0 :props.updateSolt);
	const [skillList, setSkillList] = useState([]);
	const [loading, setLoading] = useState(false);
	// const [deletedID, setDeletedID] = useState([0]);
	// const [newSkillName,setNewSkillName] = useState(props.newSkillName);
	const passValue = value => {
		console.log(value);
		console.log('invoked');
		// setDeletedID((prev)=>{prev.push(value)})这是错误的,这样是直接更改了deletedID这个数组
		// setDeletedID((prev) => [...prev, value]);
		// setNewSkillName(props.newSkillName);
		setLoading(false); //修改loading,并让useEffect监听loading就可以实现删除的即使响应,不需要新建DeletedID这个状态
		// console.log(deletedID);
	};
	useEffect(
		() => {
			axios.get(`/getPageOfDiySkill`).then(res => {
				setSkillList(res.data);
				console.log(skillList);
				setLoading(true);
				console.log(loading);
			});
		},
		[loading, props.newSkillName]
	); //通过监听pros的newSkillName来控制获取新数据
	return (
		<div className="DiySkillLib" style={{ marginLeft: '25px', minWidth: '100px', maxWidth: '1000px' }}>
			<h1>自定义技能库</h1>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{/* {!loading ? (
                    <p>Loading...</p>
                ) : (
                    skillList.map((item) => ( !(deletedID.includes(item.id))?
                        <SkillPanel
                            passValue={passValue}
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
                        />:null
                    ))
                )} */}
				{!loading
					? <p>Loading...</p>
					: skillList.map(item =>
							<SkillPanel
								passValue={passValue}
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
						)}
			</div>
		</div>
	);
}

export default SkillLib;
