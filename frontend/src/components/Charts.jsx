import{RadarChart,PolarGrid,PolarAngleAxis,Radar,ResponsiveContainer}from'recharts';import{riasec}from'../data/questions';export function Ring({value=78,label='Score'}){return <div className='ring' style={{'--p':value}}><div><strong>{value}%</strong><span>{label}</span></div></div>}
export function RadarBox(){return <ResponsiveContainer width='100%' height={260}><RadarChart data={riasec}><PolarGrid/><PolarAngleAxis dataKey='name' tick={{fill:'#e7e7ff',fontSize:12}}/><Radar dataKey='value' stroke='#005BFF' fill='#4f46e5' fillOpacity={0.55}/></RadarChart></ResponsiveContainer>}

