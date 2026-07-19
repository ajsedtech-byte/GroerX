import Sidebar from'../components/Sidebar';import Topbar from'../components/Topbar';import{careers}from'../data/questions';export default function Careers(){return <div className='app'><Sidebar/><main className='main'><Topbar title='Career Explorer' sub='Dashboard › Career Explorer'/><section className='grid-page'>{careers.concat([['AI Engineer',94],['Product Manager',84],['Data Scientist',88]]).map(([n,p])=><div className='glass career-card'><div className='icon'>✦</div><h2>{n}</h2><b>{p}% Match</b><p>Explore skills, subjects, roadmap, exams, universities and future scope.</p><button>View Roadmap</button></div>)}</section></main></div>}



