import axios from 'axios';
import {useEffect, useState} from 'react';
import {Search} from 'react-vant';
import '../static/style/TypeRestaint.css';
import TypeIcon from "./TypeIcon";

//import SearchByType from '../pages/SearchByType';
function TypeEffect(props) {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [singleType, setSingleType] = useState([]);
    const [mutiType, setMutiType] = useState([]);
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [mutiValue, setMutiValue] = useState('');
    useEffect(
        () => {
            axios
                .get('http://localhost:8080/getAllType')
                .then(res => {
                    setTypes(res.data);
                    types.map((item, index) => {
                        item["key"] = index;
                        if (item.type.includes('·')) {
                            setMutiType(p => [...p, item]);
                        } else {
                            setSingleType(p => [...p, item]);
                        }
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [loading]
    );

    const onClickType = (item) => {
        setType(item.type);
        props.passValue(item.type);
    }

    return !loading
        ? <div>
            <ul className="type-container single">
                <div className="type-header">
                    单属性
                    <Search background={'transparent'} onChange={e => setValue(e)}/>
                </div>
                {singleType
                    .filter(t => !value || value && t.type.includes(value))
                    .map((item, index) =>
                        <TypeIcon typeName={item.type}
                                  key={item.key}
                                  onClick={()=>{
                                      onClickType(item)
                                  }}
                                  imgUrl={`http://localhost:8080/img/${item.type.replace('·', '')}.webp`}></TypeIcon>
                    )}
            </ul>

            <ul className="type-container muti">
                <div className="type-header">双属性 <Search background="#0000"
                                                          onChange={(e) => setMutiValue(e)}></Search></div>
                {mutiType.filter(t => !value || value && t.type.includes(value))
                    .map((item, index) => {
                        return <TypeIcon typeName={item.type}
                                         key={item.key}
                                         onClick={()=>{
                                             onClickType(item)
                                         }}
                                         imgUrl={`http://localhost:8080/img/${item.type.replace('·', '')}.webp`}></TypeIcon>
                    })}
            </ul>
        </div>
        : <p>...</p>;
}

export default TypeEffect;
