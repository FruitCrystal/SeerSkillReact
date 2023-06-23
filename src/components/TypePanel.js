import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'//携参跳转
import { Link } from 'react-router-dom';
import '../static/style/typepanel.css';
import { Form, Selector } from 'react-vant';
import { Switch } from 'react-vant';
import { Search, Toast } from 'react-vant';
function TypePanel(props) {
	const [types, setTypes] = useState([]);
	const [loading, SetLoading] = useState(false);
	const [orderBy, setOrderBy] = useState('Power');
	const [isAsc, setIsAsc] = useState(false);
	const [value, setValue] = useState('');
	useEffect(() => {
		axios.get('http://localhost:8080/getAllType').then(res => {
			setTypes(res.data);
			console.log(res.data);
			SetLoading(true);
			console.log(types);
			console.log(props.allowJump);
		});
	}, []);

	return (
		<div className={props.allowJump ? '' : 'type-panel'}>
			<div className="options" style={{ display: 'flex' }}>
				<Search
					style={{ borderRadius: 8 }}
					// background="rgb(0,0,0,0)"
					value={value}
					showAction
					onCancel={() => {
						Toast('取消');
						console.log('草');
						setValue('');
					}}
					onChange={keyWord => {
						setValue(keyWord);
					}}
					align="left"
					placeholder="请输入属性"
				/>
				<Form.Item name="single" label="" style={{ display: props.allowJump ? 'flex' : 'none' }}>
					<label>升序</label>
					<Switch
						checked={isAsc}
						onChange={isAsc => {
							setIsAsc(isAsc);
						}}
					/>
					<Selector
						options={[
							{
								label: '按使用次数排序',
								description: '',
								value: 'MaxPP'
							},
							{
								label: '按技能威力排序',
								value: 'Power'
							},
							{
								label: '按技能先制级别排序',
								value: 'Priority'
							},
							{
								label: '按技能暴击率排序',
								value: 'critRate'
							}
						]}
						defaultValue={[orderBy]}
						onChange={(arr, extend) => {
							console.log(arr[0], extend.items);
							setOrderBy(arr[0]);
						}}
					/>
				</Form.Item>
			</div>

			<ul className="type-switch">
				{loading
					? <li>
							{types.map(e => {
								if (!value && props.allowJump) {
									console.log('分支1');
									//如果用户没有输入属性,就显示全部属性
									return (
										<Link
											onClick={ev => {
												props.passValue({ type: e.type, order: orderBy, isAsc: isAsc });
											}}
											to={`/searchByType`}
										>
											{/* <img style={{ width: "4%", height: "6%" }} src={require(`../static/${e.type.replace("·", "")}.webp`)} /> */}
											<img
												style={{ width: '4%', height: '6%' }}
												src={`http://localhost:8080/img/${e.type.replace('·', '')}.webp`}
											/>
										</Link>
									);
								} else if (value && e.type.includes(value) && props.allowJump) {
									//模糊搜索
									console.log('分支2');
									return (
										<Link
											onClick={ev => {
												props.passValue({ type: e.type, order: orderBy, isAsc: isAsc });
											}}
											to={`/searchByType`}
										>
											<img style={{ width: '4%', height: '6%' }} src={require(`../static/${e.type.replace('·', '')}.webp`)} />
										</Link>
									);
								} else if (!value && e.type.includes(value) && props.allowJump) {
									console.log('分支3');
									return (
										<Link>
											<img style={{ width: '4%', height: '6%', opacity: '0' }} />
										</Link>
									);
								} else if (value && e.type.includes(value) && !props.allowJump) {
									console.log('分支4');
									return (
										<img
											onClick={ev => {
												props.passValue({ type: e.type, order: orderBy, isAsc: isAsc });
											}}
											style={{ width: '4%', height: '6%', cursor: 'pointer' }}
											src={require(`../static/${e.type.replace('·', '')}.webp`)}
										/>
									);
								} else if (!value && !props.allowJump) {
									console.log('分支5');
									return (
										<img
											onClick={ev => {
												props.passValue({ type: e.type, order: orderBy, isAsc: isAsc });
											}}
											style={{ width: '4%', height: '6%', cursor: 'pointer' }}
											src={require(`../static/${e.type.replace('·', '')}.webp`)}
										/>
									);
								}
							})}
						</li>
					: null}
			</ul>
		</div>

		// <table style={{ width: "300px" }}>
		//     <th colSpan={9}>单属性</th>
		//     <tr>
		//         <td>
		//             <a>
		//                 <img src={require(`../static/${types[1].type}.webp`)}></img>
		//             </a>
		//         </td>
		//         <td>
		//             <img src={require("../static/火.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/草.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/飞行.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/机械.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/冰.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/地面.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/电.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/普通.webp")} />
		//         </td>
		//     </tr>
		//     <tr>
		//         <td>
		//             <img src={require("../static/超能.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/战斗.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/光.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/暗影.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/神秘.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/龙.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/圣灵.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/次元.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/远古.webp")} />
		//         </td>
		//     </tr>
		//     <tr>
		//         <td>
		//             <img src={require("../static/邪灵.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/自然.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/王.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/混沌.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/神灵.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/轮回.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/虫.webp")} />
		//         </td>
		//         <td>
		//             <img src={require("../static/虚空.webp")} />
		//         </td>
		//         <td />
		//     </tr>
		//     <th colSpan={9}>双属性</th>
		//     <tr>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//     </tr>
		//     <tr>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//     </tr>
		//     <tr>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//     </tr>
		//     <tr>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//         <td>1</td>
		//     </tr>
		// </table>
	);
}

export default TypePanel;
