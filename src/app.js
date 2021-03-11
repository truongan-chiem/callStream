import Peer from 'peerjs';
const {uid} = require('uid');
const $ = require('jquery');
const openStream = require('./openStream');
const playVideo = require('./playVideo');

const config ={host: 'streampeerjs.herokuapp.com',port: 443,secure:true,key:'peerjs'}

function getPeerId(){
    const id = uid(10);
    $('#peerId').append(id)
    return id;
}

const peer = new Peer(getPeerId(),config);

$('#btnCall').click(()=>{
   const friendId = $('#txtFriendPeerId').val();
   if(friendId===''){
        alert("Vui lòng điền ID người muốn gọi!")
        $('#txtFriendPeerId').focus();
   }
   else{
    openStream(stream =>{
        playVideo(stream,'myvideo');
        const call =peer.call(friendId,stream);
        call.on('stream', remoteStream => playVideo(remoteStream,'othervideo'))
    })
    }
})
peer.on('call', (call) => {
    openStream(stream =>{
        playVideo(stream,'myvideo');
        call.answer(stream);
        call.on('stream', remoteStream => playVideo(remoteStream,'othervideo'))
    })
  });