import axios from 'axios';
import { useEffect, useState } from 'react';
import { Search, Toast } from 'react-vant';
import SkillPanel from '../components/SkillPanel';
import '../static/style/SearchByName.css';
import { Pagination } from 'react-vant';
import { Empty } from 'react-vant';
function SearchByName() {
	const [value, setValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [resultList, setResultList] = useState([]);
	const [page, setPage] = useState(1);
	const [sum, setSum] = useState(0);
	const [offset, setOffset] = useState(0);
	// const [maxID, setMaxID] = useState(0);
	// let idList = [0]; id分页的话,往回翻页会有问题
	// function getArrMax(arr) {
	//     var max =0;
	//     for (var i = 1; i < arr.length; i++) {
	//         if (max < arr[i]) {
	//             max = arr[i];
	//         }
	//     }
	//     return max;
	// }
	// useEffect(()=>{
	//   setMaxID(getArrMax(idList));
	// },[maxID])
	useEffect(
		() => {
			if (value) {
				axios.get(`http://localhost:8080/searchByName?name=${value}&offset=${offset}`).then(res => {
					setResultList(res.data);
					console.log(resultList);
					setLoading(true);
				});
				axios.get(`http://localhost:8080/getSumByName?name=${value}`).then(res => {
					console.log('sum=' + res.data.sum);
					setSum(res.data.sum);
				});
			}
		},
		[value, page]
	);
	// console.log(maxID);
	return (
		<div>
			<Search
				value={value}
				placeholder="请输入搜索关键词"
				showAction
				onChange={val => {
					Toast(val);
					setValue(val);
				}}
				onSearch={val => {
					setPage(1);
				}}
				onCancel={() => {
					Toast('取消');
					setValue('');
				}}
				onClear={() => {
					Toast('清除');
					setValue('');
				}}
				onClickInput={() => {}}
			/>
			{loading && value != ''
				? <div className="">
						<div className="result">
							<div className="padding" />
							{resultList.map((item, index) => {
								// idList.push(item.id);
								// console.log(idList);
								return (
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
								);
							})}
						</div>
						<Pagination
							value={page}
							itemsPerPage={42}
							showPageSize={23}
							totalItems={sum}
							onChange={p => {
								setPage(p);
								setOffset((p - 1) * 42);
								// setMaxID(getArrMax(idList));
								// console.log(maxID);
							}}
						/>
					</div>
				: <Empty />}
		</div>
	);
}

export default SearchByName;
