export type RockyState = { mode: 'idle' | 'communicating' | 'resting' | 'ascii' | 'traveling' | 'curious' | 'excited' | 'waving'; paused: boolean; hidden: boolean };
export type RockyEvent = { type: 'TALK' | 'DISMISS' | 'ASCII' | 'PAUSE' | 'HIDE' | 'SHOW' | 'TRAVEL' | 'CURIOUS' | 'EXCITED' | 'WAVE' | 'SETTLE' };
export const initialRockyState: RockyState = { mode: 'idle', paused: false, hidden: false };
export function rockyReducer(state: RockyState, event: RockyEvent): RockyState {
  switch (event.type) {
    case 'TRAVEL':
    case 'CURIOUS':
    case 'EXCITED':
    case 'WAVE':
      if (state.hidden || state.paused || state.mode === 'communicating' || state.mode === 'ascii') return state;
      return { ...state, mode: event.type === 'TRAVEL' ? 'traveling' : event.type === 'CURIOUS' ? 'curious' : event.type === 'EXCITED' ? 'excited' : 'waving' };
    case 'SETTLE':
      return ['traveling','curious','excited','waving'].includes(state.mode) ? { ...state, mode: state.paused ? 'resting' : 'idle' } : state;
    case 'TALK': return { ...state, mode: 'communicating' };
    case 'DISMISS': return { ...state, mode: state.paused ? 'resting' : 'idle' };
    case 'ASCII': return { ...state, mode: 'ascii' };
    case 'PAUSE': return { ...state, paused: !state.paused, mode: state.mode === 'communicating' || state.mode === 'ascii' ? state.mode : state.paused ? 'idle' : 'resting' };
    case 'HIDE': return { ...state, hidden: true, mode: 'resting' };
    case 'SHOW': return { ...state, hidden: false, mode: state.paused ? 'resting' : 'idle' };
  }
}
