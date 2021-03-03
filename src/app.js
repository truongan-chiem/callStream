import Peer from 'peerjs';
const {uid} = require('uid');
const $ = require('jquery');

function myPeerId(){
    const id = uid(10);
    $('#peerId').append(id)
    return id;
}

// const peer = new Peer(myPeerId());
console.log(myPeerId())