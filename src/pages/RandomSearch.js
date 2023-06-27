import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-vant';
import SkillPanel from '../components/SkillPanel';
import '../static/style/randomSearch.css';
function RandomSearch() {
	const [list, setList] = useState([]);
	const [update, setUpdate] = useState(0);
	useEffect(
		() => {
			console.log('effect执行!' + update);
			axios
				.get('/searchRandomly')
				.then(res => {
					console.log(res.data);
					setList(res.data);
				})
				.catch(err => console.log(err))
				.finally(() => {
					console.log('请求已完成');
				});
		},
		[update]
	); //每当update的值发生改变,useEffect的callback就会重新执行

	return (
		<div className="panelbox">
			{!list.length
				? <p>Loading...</p>
				: list.map(item =>
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
					)}
			<Button
				type="primary"
				onClick={() => {
					setUpdate(update + 1);
				}}
			>
				再次搜索
			</Button>
		</div>
	);
}

export default RandomSearch;
