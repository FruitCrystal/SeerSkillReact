import axios from 'axios';
import { useEffect, useState } from 'react';
import { Search } from 'react-vant';
import '../static/style/TypeRestaint.css';
import TypeIcon from './TypeIcon';

//import SearchByType from '../pages/SearchByType';
function TypeEffect(props) {
	const [types, setTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [singleType, setSingleType] = useState([]);
	const [mutiType, setMutiType] = useState([]);
	const [type, setType] = useState('');
	const [value, setValue] = useState('');
	const [mutiValue, setMutiValue] = useState('');
	useEffect(
		() => {
			axios
				.get('/getAllType')
				.then(res => {
					setTypes(res.data);
					types.map((item, index) => {
						item['key'] = index;
						if (item.type.includes('·')) {
							setMutiType(p => [...p, item]);
						} else {
							setSingleType(p => [...p, item]);
						}
					});
				})
				.finally(() => {
					setLoading(false);
				});
		},
		[loading]
	);

	const onClickType = item => {
		setType(item.type);
		props.passValue(item.type);
	};

	return !loading
		? <div style={{backgroundColor:"#fff"}}>
				<ul className="type-container single">
					<div className="type-header">
						单属性
						<Search background={'transparent'} onChange={e => setValue(e)} />
					</div>
					{singleType.filter(t => !value || (value && t.type.includes(value))).map((item, index) =>
						<TypeIcon
							typeName={item.type}
							key={item.key}
							onClick={() => {
								onClickType(item);
							}}
							imgUrl={`/img/${item.type.replace('·', '')}.webp`}
						/>
					)}
				</ul>

				<ul className="type-container muti">
					<div className="type-header">
						双属性
					</div>
					{mutiType.filter(t => !value || (value && t.type.includes(value))).map((item, index) => {
						return (
							<TypeIcon
								typeName={item.type}
								key={item.key}
								onClick={() => {
									onClickType(item);
								}}
								imgUrl={`/img/${item.type.replace('·', '')}.webp`}
							/>
						);
					})}
				</ul>
			</div>
		: <p>...</p>;
}

export default TypeEffect;
