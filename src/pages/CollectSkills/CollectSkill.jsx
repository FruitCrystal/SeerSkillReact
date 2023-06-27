import axios from "axios";
import { useState } from 'react';
import { useEffect } from 'react';
import {Button} from "react-vant";
import SkillPanel from './../../components/SkillPanel';
import './index.css'
function CollectSkills(){
	const [idCollection,setIDCollection] = useState([]);
	const [skillCollection,setSkillCollection]= useState([]);
	const [loading,setLoading] = useState(true);
	const [fresh,setFresh]=useState(false);
	useEffect(()=>{
	axios.get(`/collection/get`).then(res=>{
		setIDCollection(res.data);
		//console.log(res.data);
		res.data.map((item,index)=>{
			axios.get(`/searchByID?id=${item}`).then((res)=>{
				//console.log(res.data);
				setSkillCollection(p=>[...p,res.data])
			}).finally(()=>{setLoading(false)})
		})
	});
	},[fresh])
	console.log(skillCollection)
	return (<div>
		<button className="fresh" onClick={()=>{setFresh(p=>!p);setIDCollection([]);setSkillCollection([])}}>刷新</button>
		{!loading? <div className="result">{skillCollection.map((item,index) =>
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
					)}</div>:<div>null</div>}
	</div>)
}

export default CollectSkills;