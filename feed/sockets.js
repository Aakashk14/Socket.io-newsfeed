var db = require('../app.js');
var queries = require('./db.js');


function html(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


module.exports = function(io){
    io.use(function(socket,next){

        sessionMiddleware(socket.request,{},next);

})

io.on('connection',async (socket)=>
{     

     if(socket.request.session.userid){ 
         
        socket.broadcast.emit("new client");
        room = socket.request.session.userid;
        await queries.online(room,socket);
         
         
    socket.on("sending message",(message)=>{
             if(message==""){}
               else {
                   message_s = html(message);
                   queries.userfeed(message,socket.request.session.userid,socket);

            
        socket.to(socket.request.session.userid).emit('new message',{message:message_s,name:socket.request.session.myname});
        socket.emit('new message',{message:message_s,name:socket.request.session.myname})
                }})

    socket.on("new connection",async ()=>{
        if(room!=socket.request.session.userid){
              await queries.newconnect(socket);
        }
        
    
            
                })
    socket.on("disconnect",()=>{

        queries.disconnect(socket.request.userid);
    })
}


})
}
