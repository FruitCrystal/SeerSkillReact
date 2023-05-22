import {Search, Toast} from "react-vant";
import {useEffect, useState} from "react";
import axios from "axios";
import SkillPanel from "../components/SkillPanel";

function SearchByPet(){
    const [value, setValue] = useState("");
    const [page, setPage] = useState(0);
    const [resultList, setResultList] = useState([]);
    const [name,setName] = useState("");
    useEffect(()=>{
        if (value)
         axios.get(`http://localhost:8080/getSkillByIdOrName?val=${value}`).then((res)=>{
            setResultList(res.data);
            console.log(res.data)
             res.data.map(item=>{
                 console.log(item.petsName.split("、")[item.petsID.split(',').indexOf(value)])
                 setName(item.petsName.split("、")[item.petsID.split(',').indexOf(value)])
             })
        })
        else return ()=>{}
    },[value])

    return (<div>
        <Search
            value={value}
            style={{minWidth:"100%s"}}
            placeholder="输入精灵的id或者名字，支持模糊搜索.按Enter以搜索"
            showAction
            onSearch={(val)=>{
                Toast();
                setValue(val);
            }}
        />
        <div  >
            {!resultList.length ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div>您正在查看<p style={{fontWeight:"bold",display:"inline"}}>{name? name:"有关"+"\""+value+"\""}</p>的技能</div>
                    <div style={{display:"flex", flexWrap:"wrap"}}>
                        {resultList.map((item) => (
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
                            />))}
                    </div>
                </>

            )}
        </div>
    </div>)
}
export default SearchByPet;