import test from 'node:test';
import assert from 'node:assert/strict';
import { initialRockyState, rockyReducer } from '../src/components/rocky/rocky-machine.ts';
test('pausing survives a conversation and dismissal', () => {
 const paused = rockyReducer(initialRockyState, { type: 'PAUSE' });
 const talking = rockyReducer(paused, { type: 'TALK' });
 assert.equal(talking.mode, 'communicating');
 assert.deepEqual(rockyReducer(talking, { type: 'DISMISS' }), {mode:'resting',paused:true,hidden:false});
});
test('hiding removes a conversation and restore respects pause', () => {
 const hidden = rockyReducer({mode:'communicating',paused:true,hidden:false}, {type:'HIDE'});
 assert.equal(hidden.hidden,true);
 assert.equal(hidden.mode,'resting');
 assert.deepEqual(rockyReducer(hidden,{type:'SHOW'}),{mode:'resting',paused:true,hidden:false});
});
test('ASCII changes representation without changing pause preference', () => {
 const ascii = rockyReducer({mode:'resting',paused:true,hidden:false},{type:'ASCII'});
 assert.equal(ascii.mode,'ascii');
 assert.equal(ascii.paused,true);
 assert.equal(rockyReducer(ascii,{type:'DISMISS'}).mode,'resting');
});
test('the reducer does not mutate prior state; pause is reversible', () => {
 const start = Object.freeze({...initialRockyState});
 const paused = rockyReducer(start,{type:'PAUSE'});
 assert.equal(start.mode,'idle');
 assert.deepEqual(rockyReducer(paused,{type:'PAUSE'}),initialRockyState);
});
test('contextual reactions cannot override dialogue, pause or hide', () => {
 for (const protectedState of [{mode:'communicating',paused:false,hidden:false},{mode:'ascii',paused:false,hidden:false},{mode:'idle',paused:true,hidden:false},{mode:'resting',paused:false,hidden:true}]) {
  for(const type of ['TRAVEL','CURIOUS','EXCITED','WAVE']) assert.deepEqual(rockyReducer(protectedState,{type}),protectedState);
 }
});
test('travel and reactions settle, but late timers leave dialogue intact', () => {
 let state=rockyReducer(initialRockyState,{type:'TRAVEL'});
 assert.equal(state.mode,'traveling');
 state=rockyReducer(state,{type:'CURIOUS'});
 assert.equal(state.mode,'curious');
 assert.equal(rockyReducer(state,{type:'SETTLE'}).mode,'idle');
 const talking=rockyReducer(state,{type:'TALK'});
 assert.deepEqual(rockyReducer(talking,{type:'SETTLE'}),talking);
});

test('every spontaneous animation returns to idle', () => {
 for (const type of ['TRAVEL','CURIOUS','EXCITED','WAVE']) {
  const active = rockyReducer(initialRockyState,{type});
  assert.notEqual(active.mode,'idle');
  assert.deepEqual(rockyReducer(active,{type:'SETTLE'}),initialRockyState);
 }
});
