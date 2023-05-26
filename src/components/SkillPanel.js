import '../SkillPanel.css';
import { useState } from 'react';
import { Button, Overlay } from 'react-vant';
import Detail from './Detail';
function SkillPanel(props) {
	const [visible, setVisible] = useState(false);
	const [id, setID] = useState(0);
	window.addEventListener('keydown', e => {
		if (e.code === 'Escape') {
			setVisible(false);
		}
	});
	return (
		<div className="">
			{/* //自定义技能才有的Tag */}
			{props.id > 49999
				? <button
						style={{ position: 'absolute', zIndex: 1 }}
						className="diy-tag"
						onClick={() => {
							props.passValue(props.id);
							fetch(`http://localhost:8080/deleteSkill?id=${props.id}`);
							setID(props.id);
						}}
					>
						删除
					</button>
				: null}
			<div
				onClick={e => {
					console.log('id=' + props.id);
					setID(props.id); //要先有ID,传给Detail组件
					setVisible(true); //控制遮罩可见
					/*if (window.location.href.split ('=').length != 1) {
            //以后要改,目前只有randomsearch这个功能,它是没有参数的,所以spilt之后数组长度肯定是1
            alert ('你已经在详情页面了哦!'); //避免二次点击
          } else {
            window.open ('/detail?type=' + props.id, '_self');
          }*/
				}}
				className="panel"
				// style={{zIndex:100}}
				onMouseMove={e => {
					e.stopPropagation();
					// setXPos (e.clientX - e.currentTarget.offsetLeft); //e是鼠标,e.ClientX就是鼠标的X轴(以视口为基准),e.currentTarget就是触发事件的元素,它的offsetLeft就是左边框到视口的距离,这样一减,就是鼠标到元素左边框的距离
					// setYPos (e.clientY - e.currentTarget.offsetTop); //同理
				}}
			>
				<img
					className="shuxinglogo"
					alt="属性"
					style={props.shuxing.replace('·', '') === '混沌次元' ? { width: '60%', height: '65%', marginTop: '15px' } : { width: 'auto' }}
					src={require(`../static/${props.shuxing.replace('·', '') === '--' ? '属性' : props.shuxing.replace('·', '')}.webp`)}
				/>
				<div className="info">
					<p style={{ color: 'rgb(153, 255, 255)' }}>
						{props.name}
					</p>
					<p style={{ color: 'rgb(255, 255, 0)' }}>
						{'威力：' + props.power}
					</p>
					<p style={{ color: 'white' }}>
						{'PP：' + props.pp}
					</p>
				</div>
				<div className="desc">
					<h3
						//三目运算符匹配三个条件以上
						style={
							props.category == '物理攻击'
								? { color: 'red' }
								: props.category == '特殊攻击' ? { color: 'rgb(255,153,255)' } : { color: 'rgb(13,255,0)' }
						}
					>
						{props.category}
					</h3>
					<h4
						style={props.priority == 0 ? { display: 'none' } : { display: 'block' }} //低配版v-show
					>
						{props.priority > 0 ? '先制:+' + props.priority : '先制:' + props.priority}
					</h4>
					{props.accuracy == '必中' ? <p>必中</p> : null}
					{props.des.split('；').map(
						(item, index) =>
							item == '--'
								? <p key={index} />
								: <p
										key={index}
										style={{
											textAlign: 'left',
											// borderBottom: '#062df8 solid 2px',
											marginBottom: '10px'
										}}
									>
										{'效果' + parseInt(index + 1) + '：' + item}
									</p>
					)}
				</div>
			</div>
			<Overlay
				visible={visible}
				onClick={() => setVisible(false)}
				style={{
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<div
					style={{
						backgroundColor: '#fff',
						borderRadius: 10
					}}
				>
					{visible ? <Detail information={id} /> : <p>loading</p>}
					{/* <table
            border={0}
            style={{width: '500px', height: '250px', borderRadius: 10}}
          >
            <tr style={{whiteSpace: 'nowrap'}}>
              <th>技能属性</th>
              <td>
                <img
                  style={{width: '15%'}}
                  src={require (`../static/${props.shuxing.replace ('·', '') === '--' ? '属性' : props.shuxing.replace ('·', '')}.webp`)}
                />
                {props.type == '--' ? '属性技能' : props.shuxing}
              </td>
            </tr>
            <tr>
              <th>技能命中率</th>
              <td>{props.accuracy}</td>
            </tr>
            <tr>
              <th>技能暴击率</th>
              <td>{props.critRate}</td>
            </tr>
            <tr>
              <th>先制级别</th>
              <td
                style={
                  props.priority == 0 ? {opacity: '0'} : {display: 'block'}
                } //低配版v-show
              >
                {props.priority > 0
                  ? '+' + props.priority
                  : '' + props.priority}
              </td>
            </tr>
            <tr>
              <th>技能持有者</th>
              <td style={{whiteSpace: 'pre-line'}}>{props.petsName}</td>
            </tr>
            <tr>
              <th>技能效果</th>
              <td style={{whiteSpace: 'pre-line'}}>{props.des}</td>
            </tr>
                </table>*/}
				</div>
			</Overlay>
		</div>
	);
}

export default SkillPanel;
