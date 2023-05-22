import {useEffect, useState} from "react";
import axios from "axios";
import { Divider } from 'antd';
import EffectTable from "../components/EffectTable";

function Effect(){

    const [effectList, setEffectList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`http://localhost:8080/effect/getEffect`).then((res)=>{
            setEffectList(res.data);
            setLoading(false)
            console.log(res.data)
        }).catch(err=>console.log(err))
    },[loading])
    return (<div>
        {!loading? <div style={{minWidth:1700,margin:"auto auto"}}><Divider>技能属性图鉴</Divider>
            <EffectTable data={effectList}></EffectTable></div>:"loading..."}
    </div>)
}
export default Effect;