function Bar(props) {
    return (
        <div style={
        {
            overflow:"revert",
            height:"15px",
            width:props.value<1000? props.value*0.5:500,
            background:"aqua"
        }
    }>{props.value}</div>)
}
export default Bar;