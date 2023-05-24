// import axios from 'axios';
import { useEffect, useState } from 'react';
// import SkillPanel from '../components/SkillPanel';
import '../static/style/detail.css';
import { Skeleton } from 'react-vant';
// import {Button} from 'react-vant';
function Detail(props) {
	const [information, setInformation] = useState({});
	const [loading, setLoading] = useState(true); //useEffect钩子用于从服务器获取数据并更新information的状态。但是，由于information的初始状态是一个空对象，组件将在获取数据之前呈现，因此information仍将是一个空对象。为了处理这个问题，您可以添加一个条件检查，以在获取数据并更新information之前呈现加载状态。
	console.log(props.information); //传进来的id
	let url = `http://localhost:8080/searchByID?id=${props.information}`; //根据传来的ID组织url
	useEffect(
		() => {
			fetch(url).then(res => res.json()).then(resp => {
				setInformation(resp);
				setLoading(false);
			});
		},
		[url]
	);
	return (
		<div className="detail-page">
			{loading
				? <Skeleton />
				: <div>
						<table border={0} style={{ width: 'auto' }}>
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
								<th>先制级别</th>
								<td
									style={information.priority == 0 ? { opacity: '0' } : { display: 'block' }} //低配版v-show
								>
									{information.priority > 0 ? '+' + information.priority : '' + information.priority}
								</td>
							</tr>
							<tr>
								<th>技能持有者</th>
								<td style={{ whiteSpace: 'pre-line' }}>
									{information.petsName}
								</td>
							</tr>
							<tr>
								<th>技能效果</th>
								<td style={{ whiteSpace: 'pre-line' }}>
									{information.des}
								</td>
							</tr>
						</table>
					</div>}
		</div>
	);
}

export default Detail;

/*
function Detail () {
  const [information, SetInformation] = useState ({});
  let id = parseInt (window.location.href.split ('=')[1]);
  console.log ('id=' + id);
  let url = `http://localhost:8080/searchByID?id=${id}`;
  useEffect (() => {
    fetch (url).then (res => res.json ()).then (resp => SetInformation (resp));
  }, []);
  console.log (information);
  return (
    <div>
      {typeof information == 'undefine'
        ? '获取失败'
        : <SkillPanel shuxing={information.type} />}
    </div>
  );
}
export default Detail;
*/
