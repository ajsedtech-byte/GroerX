export default function Steps({active=4}){let s=['About Test','Instructions','Start Test','Questions','Results'];return <div className='steps'>{s.map((x,i)=><div className='step' key={x}><b className={i<active?'done':i===active?'current':''}>{i<active?'✓':i+1}</b><span>{x}</span>{i<s.length-1&&<em/>}</div>)}</div>}



