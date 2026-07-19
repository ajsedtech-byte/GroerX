import{create}from'zustand';import{questions}from'../data/questions';export const useAssessment=create((set,get)=>({current:0,answers:{},questions,select:(id,val)=>set(s=>({answers:{...s.answers,[id]:val}})),next:()=>set(s=>({current:Math.min(s.current+1,s.questions.length-1)})),prev:()=>set(s=>({current:Math.max(s.current-1,0)})),progress:()=>Math.round((Object.keys(get().answers).length/60)*100)}));



