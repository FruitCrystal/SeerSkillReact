import axios from 'axios';
import { useEffect, useState } from 'react';
import Bar from "../components/Bar";
function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get('http://localhost:8080/getSumOfAllType')
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .finally(() => console.log(data));
    }, []);
    return (
        <div>
            <div>
                <h3>各系技能数量</h3>
                <div style={{overflowX:"scroll",overflowY:"hidden",maxWidth:"800px",display:"flex",flexWrap:"wrap",flexDirection:"column",maxHeight:"800px",justifyContent:"space-evenly"}}>
                    {!loading
                    ? data.map((item) => (
                        <div style={{
                            display:"flex",
                            alignItems:"baseline"
                        }}>
                            <img key={item.sum} width={"7%"} alt="属性ico" src={item.Type!="--"?`http://localhost:8080/img/${item.Type.replace('·','')}.webp`:`http://localhost:8080/img/属性.webp`}/>
                            <Bar value={item.sum}></Bar>
                        </div>
                    ))
                    : null}</div>
            </div>
        </div>
    );
}
export default Home;
