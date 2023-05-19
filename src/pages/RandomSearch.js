import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "react-vant";
import SkillPanel from "../components/SkillPanel";

function RandomSearch() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(0);
    useEffect(() => {
        axios
            .get("http://localhost:8080/searchRandomly")
            .then((res) => {
                setList(res.data);
                setLoading(false);//放在这就可以实现再次查询,因为放在这里可以确保这个Promise执行完了,才取消加载中的状态.但是如果useEffect的依赖项是loading时,会导致渲染两次.
            })
            .catch((err) => console.log(err)).finally(()=>{console.log("请求已完成")});
            //setLoading (false);原来的位置,无法实现再次查询. 因为放在这不会执行,因为这里不属于Promise,属于同步任务队列,await之后的代码都要等待await执行完之后才会执行.
    }, [update]);

    console.log(list);
    return (
        <div className="panelbox">
            {loading ? (
                <p>Loading...</p>
            ) : (
                list.map((item) => (
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
            <Button
                className="search-again"
                type="primary"
                onClick={() => {
                    setLoading(true);
                    setUpdate((prev)=>prev+1)
                }}
            >
                再次搜索
            </Button>
        </div>
    );
}

export default RandomSearch;
