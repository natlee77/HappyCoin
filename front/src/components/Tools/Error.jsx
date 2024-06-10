
const Error = ({msgs, toggle}) => {
    let id = 0;
    return <div className="error">
        {msgs.map( msg => {
            id ++;
            return <p key={id}>{msg}</p>
        })}
        <button className="btn" onClick={toggle}>Close</button>
    </div>
}

export default Error;