import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SkillPanel from '../components/SkillPanel';
import '../static/style/SearchByEffect.css';
import { Pagination } from 'react-vant';
import { Button } from 'react-vant';

function SearchByEffect() {
	const { id } = useParams(); //useParams用于接收路由的参数
	const [loading, setLoading] = useState(true);
	const [resultList, setResultList] = useState([]);
	const [page, setPage] = useState(1);
	const [effect, setEffect] = useState({});
	const [sum, setSum] = useState(0);
	useEffect(
		() => {
			axios.get(`/getSkillByEffect?id=${id}&page=${page}`).then(res => {
				setResultList(res.data);
				console.log(res.data);
				setLoading(false);
			});
			axios.get(`/effect/getOneEffectByID?id=${id}`).then(res => setEffect(res.data));
			axios.get(`/getSumOfSkillByEffect?id=${id}`).then(res => setSum(res.data));
		},
		[page, id]
	);

	return (
		<div>
			<div className="head">
				{effect.des}
			</div>
			<div style={{ display: 'flex' }}>
				<Link to={'/Effect'}>
					<Button type="primary" className="back-btn">
						返回
					</Button>
				</Link>
				{!loading
					? <div style={{ display: 'flex', flexWrap: 'wrap' }}>
							{resultList.map(item =>
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
							<Pagination
								className="effectPage"
								value={page}
								onChange={e => {
									setPage(e);
									console.log('page:' + e);
								}}
								totalItems={sum}
								itemsPerPage={42}
								showPageSize={23}
							/>
						</div>
					: <p>loading...</p>}
			</div>
		</div>
	);
}

export default SearchByEffect;
