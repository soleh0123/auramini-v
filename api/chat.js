export default async function handler(req,res){
 let parts;
 if(req.body.image){
  parts=[
   {text:"Bacakan SEMUA data dan tulisan dari gambar ini secara lengkap dan rapi."},
   {inline_data:{mime_type:"image/jpeg",data:req.body.image}}
  ];
 }else{
  parts=[{text:req.body.q}];
 }
 const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_KEY}`,{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({contents:[{parts}]})
 });
 const data=await response.json();
 const jawaban=data.candidates[0].content.parts[0].text;
 res.json({jawaban});
}
