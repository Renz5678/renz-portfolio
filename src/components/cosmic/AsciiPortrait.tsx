import type { CSSProperties } from 'react';
const columns=6,rows=8;
export default function AsciiPortrait() {
 return <figure className="cosmic-portrait" role="img" aria-label="Lawrenz in a sideways ASCII portrait"><div className="cosmic-portrait-image"><div className="cosmic-portrait-frame cosmic-pixel-assembly" data-active="true" aria-hidden="true">{Array.from({length:columns*rows},(_,index)=>{
  const col=index%columns,row=Math.floor(index/columns);
  return <span className="cosmic-portrait-tile" key={index} style={{
   left:`${col*100/columns}%`,top:`${row*100/rows}%`,width:`${100/columns}%`,height:`${100/rows}%`,
   maskPosition:`${col*100/(columns-1)}% ${row*100/(rows-1)}%`,
   '--tile-x':`${((index*37)%9-4)*24}px`,'--tile-y':`${((index*19)%11-5)*20}px`,'--tile-delay':String(index%7*.05),
  } as CSSProperties}/>;
 })}</div></div></figure>;
}
