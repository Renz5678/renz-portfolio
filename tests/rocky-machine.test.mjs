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
