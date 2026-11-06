/** Provisional hand-authored pixel study; replace after source reference review. */
export default function RockySprite({ resting = false }: { resting?: boolean }) {
  return <svg viewBox="0 0 64 64" className="rocky-sprite" aria-hidden="true" shapeRendering="crispEdges" data-resting={resting}>
    <path fill="#51463d" d="M28 8h8v8h5v7h7v5h8v8h-6v-4h-9v8h5v8h4v8H39V45h-6v5h-5v8H17v-8h5V39h-9v5H5V33h8v-6h9v-7h6z"/>
    <path fill="#90765a" d="M29 9h6v13h5v6h12v6H39v8h5v10h-4V42H30v8h-5v5h-5v-5h5V36H13v5H8v-7h8v-5h10v-8h3z"/>
    <path fill="#c1a280" d="M29 21h7v5h5v8h-8v7h-7V30h3zM29 10h4v9h-4zM42 28h9v3h-9zM9 34h9v3H9zM40 45h3v6h-3zM21 51h4v3h-4z"/>
    <path fill="#6c5846" d="M34 27h6v8h-6zM27 34h7v7h-7zM25 23h4v8h-4z"/>
    <path fill="#ead1a5" d="M29 23h5v3h-5zM27 28h3v4h-3z"/>
  </svg>;
}
