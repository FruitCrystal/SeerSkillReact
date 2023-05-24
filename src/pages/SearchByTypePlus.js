import { useEffect, useState } from 'react';
import TypePanel from '../components/TypePanel';
import SkillPanel from '../components/SkillPanel';
// import axios from "axios";
import { Button } from 'react-vant';
import '../static/style/searchByType.css';
import { Pagination } from 'react-vant';
import TypeEffect from '../components/TypeEffective';
import SearchOption from '../components/SearchOption';
function SearchByTypeCopy(props) {
	const [nowtype, setTypes] = useState('');
	const [loading, setLoading] = useState(false);
	const [skillList, setList] = useState([]);
	const [order, setOrder] = useState('Power');
	const [isAsc, setIsAsc] = useState(false);
	const [url, setUrl] = useState('');
	const [page, setPage] = useState(1);
	const [offset, setOffset] = useState(0); //分页查询,sql8.0以上支持,语法: select * from table limit `每页数量` offset `查询偏移量`,如果偏移量是400,就从第400挑数据开始找
	const [sum, setSum] = useState(0);
	//AI makes this useEffect,
	console.log('属性' + nowtype);
	console.log(order);
	console.log('leng=' + skillList.length);
	useEffect(
		() => {
			if (nowtype && order) {
				setUrl(`http://localhost:8080/searchByType?type=${nowtype}&orderBy=${order}&isAsc=${isAsc}&offset=${offset}`);
			}
		},
		[nowtype, order, order, offset, isAsc]
	);

	//很明显，url参数没有被正确设置。具体来说，nowtype和order变量被用来构建url字符串，但是它们在fetch调用使用它们之前没有被及时更新。这是因为useState钩子的更新是异步的，所以在调用setTypes和setOrder之后，url变量不会立即更新。为了解决这个问题，您可以使用useEffect钩子在nowtype或order更改时更新url变量。以下是如何修改SearchByType组件以实现此目的的示例：
	useEffect(
		() => {
			fetch(url).then(res => res.json()).then(resp => {
				console.log(resp);
				setList(resp);
				setLoading(true);
			});
			fetch(`http://localhost:8080/getSumOfType?type=${nowtype}`).then(res => res.json()).then(resp => {
				setSum(resp.sum);
				// console.log("属性:"+nowtype+"数量:"+ resp.sum)
				setLoading(true);
			});
		},
		[url, nowtype]
	);
	const callback = getValueFromChild => {
		setTypes(getValueFromChild.type);
		setOrder(getValueFromChild.order);
		setIsAsc(getValueFromChild.isAsc);
	};
	console.log(url);
	console.log(nowtype);
	console.log(order);
	console.log(isAsc);
	console.log('sum=' + sum);
	return (
		<div>
			<div className="search-by-type">
				{true
					? <div>
							<SearchOption
								width={708}
								passValue={value => {
									setIsAsc(value.isAsc);
									setOrder(value.order);
								}}
							/>
							<div style={{ width: 708 }}>
								{' '}<TypeEffect
									passValue={value => {
										setTypes(value);
										setPage(1);
										setOffset(0);
									}}
								/>
							</div>
						</div>
					: ''}
				{loading && nowtype !== ''
					? <div className="result-panel">
							{skillList.map(item =>
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
						</div>
					: <p />}
				{nowtype === ''
					? null
					: <Pagination
							className="page"
							value={page}
							onChange={e => {
								if (nowtype && order) {
									setUrl(`http://localhost:8080/searchByType?type=${nowtype}&orderBy=${order}&isAsc=${isAsc}&offset=${offset}`);
									setPage(e);
									setOffset((e - 1) * 42);
									console.log('page:' + e);
								}
							}}
							totalItems={sum}
							itemsPerPage={42}
							showPageSize={23}
						/>}
			</div>
		</div>
	);
}
export default SearchByTypeCopy;
