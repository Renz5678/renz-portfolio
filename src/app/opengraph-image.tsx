import { ImageResponse } from 'next/og';
export const alt = 'Lawrenz Garcia — Full-Stack Developer. Web and mobile applications, APIs, and databases.';
export const size = {width:1200,height:630};
export const contentType = 'image/png';
export default function OpenGraphImage() {
 return new ImageResponse(<div style={{display:'flex',width:'100%',height:'100%',background:'#08110e',color:'#f0f2dd',padding:72,flexDirection:'column',justifyContent:'space-between',fontFamily:'sans-serif'}}><div style={{display:'flex',fontSize:24,color:'#c7e879',letterSpacing:4}}>FULL-STACK DEVELOPER / PHILIPPINES</div><div style={{display:'flex',flexDirection:'column',fontSize:106,fontWeight:700,lineHeight:1.05,letterSpacing:-4}}><span>Lawrenz</span><span>Garcia<span style={{color:'#b58642'}}>.</span></span></div><div style={{display:'flex',justifyContent:'space-between',fontSize:24,color:'#b6c3ae'}}><span>Web. Mobile. APIs. Databases.</span><span>renzgarcia.site</span></div></div>,size);
}
