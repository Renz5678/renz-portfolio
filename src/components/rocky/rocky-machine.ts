export type RockyState = { mode: 'idle' | 'communicating' | 'resting' | 'ascii'; paused: boolean; hidden: boolean };
export type RockyEvent = { type: 'TALK' | 'DISMISS' | 'ASCII' | 'PAUSE' | 'HIDE' | 'SHOW' };
export const initialRockyState: RockyState = { mode: 'idle', paused: false, hidden: false };
export function rockyReducer(state: RockyState, event: RockyEvent): RockyState {
  switch (event.type) {
    case 'TALK': return { ...state, mode: 'communicating' };
    case 'DISMISS': return { ...state, mode: state.paused ? 'resting' : 'idle' };
    case 'ASCII': return { ...state, mode: 'ascii' };
    case 'PAUSE': return { ...state, paused: !state.paused, mode: state.mode === 'communicating' || state.mode === 'ascii' ? state.mode : state.paused ? 'idle' : 'resting' };
    case 'HIDE': return { ...state, hidden: true, mode: 'resting' };
    case 'SHOW': return { ...state, hidden: false, mode: state.paused ? 'resting' : 'idle' };
  }
}
