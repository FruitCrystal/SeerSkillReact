import axios from "axios";
import { useEffect, useState } from "react";
import SkillPanel from "../components/SkillPanel";

function SkillLib(props) {
    // const [uSpdate,setUpdate] = useState(props.updateSolt? 0 :props.updateSolt);
    const [skillList, setSkillList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:8080/getPageOfDiySkill`).then((res) => {
            setSkillList(res.data);
            console.log(skillList);
            setLoading(true);
            console.log(loading);
        });
    }, []);
    return (
        <div className="DiySkillLib" style={{ marginLeft: "25px" }}>
            <h1>自定义技能库</h1>
            <div style={{display:"flex",flexWrap:"wrap"}}>
                {!loading ? (
                    <p>Loading...</p>
                ) : (
                    skillList.map((item) => (
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
                    ))
                )}
            </div>
        </div>
    );
}

export default SkillLib;