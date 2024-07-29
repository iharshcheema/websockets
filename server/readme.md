<!-- Http  -->

- client requests and server respose

<!-- Web sockets -->

- a connection is established between client and server
  server can still send data even when the server do not respond, for example insta sends notification

Server can create an event and the client will listen on that event

A whole circuit will be io(also this is server)

Clients will be sockets inside the circuit

<!-- io.emit -->

- message is being sent to the whole circuit(to all the sockets present in the circuit)

when we say "socket" we are talking about an individual user(client)

Every "socket" has an individual id

<!-- TRIGGERING EVENT: -->

emit - event trigger e.g. xyzevent (data)

<!-- data bhejre  -->

on- handler/listener e.g xyzevent(data)

<!-- data lere -->

connection and disconnect are pre built events

<!-- EXAMPLE: -->

server-side:
io.emit( event , data)

client-side :

socket.on( event , (data)=>{
//do something with the data
})

<!-- EMIT EVENTS ON CLIENT SIDE : -->

Lets say there s a btn on which when we click xyzevent gets triggered :

socket.emit(xyzevent , data)

In some other socket, whenever that event gets fired we can listen to that event by .on:

socket.on( xyzevent ,(data)=>{
//
})

<!-- brodcast  -->

socket.brodcast.emit(//)
the socket which emits will not recieve the message
`

<!-- room id  -->

individually every socket in a room have an id

we can use this id if a particular socket wants to talk to a particular socket

<!-- to  -->
<!-- to trigger event for a particular room  -->

socket.to(roomID).emit(//)
we pass the id of the sockets we want to talk to

<!-- a particular socket can create a room and all the sockets present inside that room will receive the messages emitted by that particular socket -->

<!-- join  -->

if we want some sockets to join in a particular room , join is used

socket.join(roomID)
