export default function Planet({variant='tulong',label}:{variant?:string;label:string}) {
 return <div className={`cosmic-planet-space planet-${variant}`} aria-hidden="true"><div className="cosmic-orbit"/><div className="cosmic-planet"><div className="cosmic-planet-bands"/><div className="cosmic-planet-grain"/></div><span className="cosmic-planet-caption">{label}</span></div>;
}
