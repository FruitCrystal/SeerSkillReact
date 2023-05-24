import axios from 'axios';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'//携参跳转
import {Link } from 'react-router-dom';
import '../static/style/typepanel.css';
import { Form, Selector } from 'react-vant';
import { Switch } from 'react-vant';
import { Search, Toast } from 'react-vant';
function SearchOption(props) {
    const [orderBy, setOrderBy] = useState('Power');
    const [isAsc, setIsAsc] = useState(false);
    const [value, setValue] = useState('');
	return (
		<div>
			<div className="options" style={{ display: 'flex',width:props.width }}>
				<Form.Item name="single" label="">
					<label>升序</label>
					<Switch
						checked={isAsc}
						onChange={isAsc => {
							setIsAsc(isAsc);
							props.passValue({order:orderBy,isAsc:isAsc})
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
							props.passValue({order:arr[0],isAsc:isAsc})
						}}
					/>
				</Form.Item>
			</div>
		</div>
	);
}
export default SearchOption;
