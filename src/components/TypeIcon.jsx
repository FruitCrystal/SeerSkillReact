export default function TypeIcon({typeName, imgUrl, onClick}) {
    return (<li
        className="type"
        onClick={onClick}
    >
        <div className={'imgBox'}><img alt='属性' src={imgUrl} className="icon"/></div>
        <div style={{textAlign: 'center', fontSize: '13px'}}>
            {typeName}
        </div>
    </li>)
}