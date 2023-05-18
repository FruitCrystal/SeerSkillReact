import axios from 'axios';
import {useState, useEffect} from 'react';
import SkillPanel from '../components/SkillPanel';
// import {Button, Overlay} from 'react-vant';

function RandomSearch () {
  const [list, setList] = useState ([]);
  const [loading, setLoading] = useState (true);

  useEffect (() => {
    axios
      .get ('http://localhost:8080/searchRandomly')
      .then (res => setList (res.data))
      .catch (err => console.log (err));
    setLoading (false);
  }, []);
  
  console.log (list);
  return (
    <div className="panelbox">
      {loading
        ? <p>Loading...</p>
        : list.map (item => (
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
          ))}
    </div>
  );
}

export default RandomSearch;
