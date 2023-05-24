import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'react-vant';
//import Restraint from '../pages/Restraint';
import '../static/style/TypeRestaint.css';
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
				.get('http://localhost:8080/getAllType')
				.then(res => {
					setTypes(res.data);
					console.log(res.data);
					types.map(item => {
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
	return !loading
		? <div className="main">
				<div className="left-meun">
					<ul className="type-container single">
						<p className="type-header">
							单属性<Search background="#0000" onChange={e => setValue(e)} />
						</p>
						{singleType.map((item,index) => {
							if (!value) {
								return (
									<li
										id={index}
										onClick={(e) => {
											setType(item.type);
											props.passValue(item.type);
											console.log(e.currentTarget);
										}}
										className="type"
										//style={{backgroundColor:type===item.type? "rgb(131, 164, 185)":"rgb(213,238,246);"}}
									>
										<Link>
											<img alt='属性' width={30} src={`http://localhost:8080/img/${item.type}.webp`} />
										</Link>
										<div style={{ textAlign: 'center', fontSize: '13px' }}>
											{item.type}
										</div>
									</li>
								);
							} else if (value && item.type.includes(value)) {
								return (
									<li
										id={index}
										onClick={() => {
											setType(item.type);
											props.passValue(item.type);
										}}
										className="type"
									>
										<Link>
											<img alt='属性' width={30} src={`http://localhost:8080/img/${item.type}.webp`} />
										</Link>
										<div style={{ textAlign: 'center', fontSize: '13px' }}>
											{item.type}
										</div>
									</li>
								);
							}
						})}
					</ul>

					<ul className="type-container muti">
						<p className="type-header">双属性 <Search background="#0000" onChange={(e)=>setMutiValue(e)}></Search></p>
						{mutiType.map((item,index) => {
							if (!mutiValue) {
								return (
									<li
										id={index}
										onClick={() => {
											setType(item.type);
											props.passValue(item.type);
										}}
										className="type"
									>
										<Link>
											<img alt='属性' width={30} src={`http://localhost:8080/img/${item.type.replace('·','')}.webp`} />
										</Link>
										<div style={{ textAlign: 'center', fontSize: '13px' }}>
											{item.type}
										</div>
									</li>
								);
							} else if (mutiValue && item.type.includes(mutiValue)) {
								return (
									<li
									id={index}
										onClick={() => {
											setType(item.type);
											props.passValue(item.type);
										}}
										className="type"
										//style={{backgroundColor:type===item.type? "rgb(131, 164, 185)":"rgb(213,238,246);"}}
									>
										<Link>
											<img alt='属性' width={30} src={`http://localhost:8080/img/${item.type.replace('·', '')}.webp`} />
										</Link>
										<div style={{ textAlign: 'center', fontSize: '13px' }}>
											{item.type}
										</div>
									</li>
								);
							}
						})}
					</ul>
				</div>
			</div>
		: <p>...</p>;
}

export default TypeEffect;
