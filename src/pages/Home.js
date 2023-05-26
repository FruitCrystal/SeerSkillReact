import axios from 'axios';
import { useEffect, useState } from 'react';
import Bar from '../components/Bar';
function Home() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios
			.get('http://localhost:8080/getSumOfAllType')
			.then(res => {
				setData(res.data);
				setLoading(false);
			})
			.catch(err=>{
				console.log(err);
			})
			.finally(() => console.log(data));
	}, []);
	return (
		<div>
			<div>
				<h3>各系技能数量</h3>
				<div
					style={{
						overflowX: 'scroll',
						overflowY: 'hidden',
						maxWidth: '100vh',
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'column',
						maxHeight: '800px',
						justifyContent: 'space-around'
					}}
					onWheel={e => {
						//鼠标滚轮事件
						e.deltaY < 0 ? (e.currentTarget.scrollLeft -= 500) : (e.currentTarget.scrollLeft += 500);
						//ΔY小于0,说明向上滑动,画面就往左动
					}}
				>
					{!loading
						? data.map(item =>
								<div
									key={item.Type}
									style={{
										width: 500,
										display: 'flex',
										alignItems: 'center'
									}}
								>
									<img
										key={item.sum}
										width="45px"
										alt="属性ico"
										src={
											item.Type !== '--'
												? `http://localhost:8080/img/${item.Type.replace('·', '')}.webp`
												: `http://localhost:8080/img/属性.webp`
										}
									/>
									<Bar value={item.sum} type={item.Type} />
								</div>
							)
						: null}
				</div>
			</div>
		</div>
	);
}
export default Home;
