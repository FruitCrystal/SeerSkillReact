import axios from 'axios';
import { useEffect, useState } from 'react';
// import SkillPanel from '../components/SkillPanel';
import '../static/style/detail.css';
import { Button, Skeleton } from 'react-vant';
//import { HeartOutlined } from '@ant-design/icons';
// import {Button} from 'react-vant';
function Detail(props) {
	const [information, setInformation] = useState({});
	const [loading, setLoading] = useState(true); //useEffect钩子用于从服务器获取数据并更新information的状态。但是，由于information的初始状态是一个空对象，组件将在获取数据之前呈现，因此information仍将是一个空对象。为了处理这个问题，您可以添加一个条件检查，以在获取数据并更新information之前呈现加载状态。
	console.log(props.information); //传进来的id
	const [collection, setCollection] = useState([]);
	const [isCollected, setCollected] = useState(false);
	let url = `/searchByID?id=${props.information}`; //根据传来的ID组织url
	useEffect(
		() => {
			fetch(url).then(res => res.json()).then(resp => {
				setInformation(resp);
				setLoading(false);
			});
		},
		[url]
	);
	useEffect(
		() => {
			axios
				.get(`/collection/get`)
				.then(res => {
					console.log(res.data);
					setCollection(res.data);
					setCollected(res.data.includes(props.information));
				})
				.finally(() => {});
		},
		[isCollected]
	);
	console.log(information);
	return (
		<div className="detail-page">
			<div style={{ position: 'relative', left: '96%' }}>
				<Button
					size="small"
					type="primary"
					onClick={e => {
						setCollected(p => !p); //切换样式
						if (!isCollected) {
							fetch(`/collection/add?id=${props.information}`);
						} else {
							fetch(`/collection/delete?id=${props.information}`);
						}
					}}
				>
					{isCollected ? <p className="collected">⭐</p> : <p className="uncollected">⭐</p>}
				</Button>
			</div>
			{loading
				? <Skeleton />
				: <div>
						<table border={0} style={{ width: 'auto' }} className="detail">
							<tr style={{ whiteSpace: 'nowrap' }}>
								<th>技能属性</th>
								<td>
									<img
										style={
											information.type.replace('·', '') === '混沌次元'
												? { width: '15%', height: '25%' }
												: { width: '5%', height: '8%' }
										}
										src={require(`../static/${information.type.replace('·', '') === '--'
											? '属性'
											: information.type.replace('·', '')}.webp`)}
									/>
									{information.type == '--' ? '属性技能' : information.type}
								</td>
							</tr>
							<tr>
								<th>技能ID</th>
								<td>
									{information.id}
								</td>
							</tr>
							<tr>
								<th>技能类别</th>
								<td
									style={
										information.category == '物理攻击'
											? { color: 'red' }
											: information.category == '特殊攻击' ? { color: 'rgb(255,153,255)' } : { color: 'rgb(0,255,0)' }
									}
								>
									{information.category}
								</td>
							</tr>
							<tr>
								<th>技能精准度</th>
								<td>
									{information.accuracy}
								</td>
							</tr>
							<tr>
								<th>技能暴击率</th>
								<td>
									{information.critRate}
								</td>
							</tr>
							<tr>
								<th>技能威力</th>
								<td>
									{information.power}
								</td>
							</tr>
							<tr>
								<th>先制级别</th>
								<td style={information.priority == 0 ? { opacity: '0' } : { display: 'block' }}>
									{/*//低配版v-show*/}
									{information.priority > 0 ? '+' + information.priority : '' + information.priority}
								</td>
							</tr>
							<tr>
								<th style={{ Height: '100px' }}>技能持有者</th>
								<td style={{ whiteSpace: 'pre-wrap', maxHeight: 100 }}>
									<div style={{ maxHeight: '100px', overflowY: 'scroll' }}>
										{information.petsName}
									</div>
								</td>
							</tr>
							<tr>
								<th>技能效果</th>
								<td style={{ whiteSpace: 'pre-line' }}>
									{information.des.split('；').map((item, index) => `(${index + 1})：${item}\n`)}
								</td>
							</tr>
							<tr>
								<th>技能效果代码</th>
								<td style={{ whiteSpace: 'pre-line' }}>
									{information.sideEffect.split(' ').map((item, index) =>
										<a href={`#/SearchByEffect/${item}`}>
											{item + '  '}
										</a>
									)}
								</td>
							</tr>
							<tr>
								<th>技能效果数值</th>
								<td style={{ whiteSpace: 'pre-line', lineHeight: '37px' }}>
									{information.sideEffectArg}
								</td>
							</tr>
						</table>
					</div>}
		</div>
	);
}

export default Detail;
