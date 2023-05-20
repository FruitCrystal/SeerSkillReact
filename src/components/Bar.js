function Bar(props) {
    return (
        <div style={
        {
            overflow:"revert",
            height:"15px",
            width:props.value<1000? props.value*0.5:props.value*0.3,
            background:"aqua",
            borderRadius:8,
            textAlign:"right"
        }
    }>{props.value}</div>)
}
export default Bar;