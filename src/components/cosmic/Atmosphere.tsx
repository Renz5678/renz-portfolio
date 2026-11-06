/** Original procedural CSS study, not an extraction of the unavailable references. */
export default function Atmosphere() {
  return <div className="cosmic-atmosphere" aria-hidden="true">
    <svg className="cosmic-stars" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 76 }, (_, i) => <rect key={i} x={(i * 293 + 71) % 1440} y={(i * 137 + 49) % 900} width={i % 9 === 0 ? 2 : 1} height={i % 9 === 0 ? 2 : 1} fill={i % 9 === 0 ? '#ddbd87' : '#b4c7cd'} opacity={0.2 + (i % 5) * 0.12} />)}
    </svg>
    <div className="cosmic-distant-light" /><div className="cosmic-nebula" /><div className="cosmic-horizon" /><div className="cosmic-dither" />
  </div>;
}
