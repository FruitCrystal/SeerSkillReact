import {Search} from "react-vant";
import {useEffect, useState} from "react";
import axios from "axios";
import SkillPanel from "../components/SkillPanel";
import '../static/style/SearchByPet.css'
import {Empty} from "antd";
function SearchByPet(){
    const [value, setValue] = useState("");
    const [page, setPage] = useState(0);
    const [resultList, setResultList] = useState([]);
    const [name,setName] = useState("");
    //const search = useRef(null)
    //window.addEventListener("keydown",(e)=>{e.code==="Enter"?search.current.focus(1): console.log(e.code)})
    useEffect(()=>{
        if (value)
        axios.get(`/getSkillByIdOrName?val=${value}`).then((res)=>{
            setResultList(res.data);
            console.log(res.data)
            if(!res.data.length){
                alert("查询结果为空！")
                setValue("")
                return ()=>{}
            }
            res.data.map(item=>{
                console.log(item.petsName.split("、")[item.petsID.split(',').indexOf(value)])
                setName(item.petsName.split("、")[item.petsID.split(',').indexOf(value)])
            })
        }).catch(err=>{
            alert("输入有误，请重新输入");
        })
        else return ()=>{}
    },[value])

    return (<div>
        <Search
            autoFocus
            value={value}
            className={"search"}
            placeholder="输入精灵的id或者名字，支持模糊搜索.按Enter以搜索"
            showAction
            onSearch={(val)=>{
                setValue(val);
            }}
        />
        <div  >
            {!resultList.length ? (
                <Empty description="暂无内容"></Empty>
            ) : (
                <>
                {value? <img src={`http://seerh5.61.com/resource/assets/pet/head/${value}.png`} alt=""></img>:null}
                    <div>您正在查看<p style={{fontWeight:"bold",display:"inline",color:"rgb(51,51,51)",fontSize:18}}>{name? name:"有关"+"\""+value+"\""}</p>的技能
                    </div>
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