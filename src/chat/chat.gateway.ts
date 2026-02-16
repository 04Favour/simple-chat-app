import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'
import { ChatService } from './chat.service';
import { ALL_MESSAGES, CREATE_MESSAGE, TYPING } from 'src/common/constants';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({cors: {origin: '*'}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  constructor(private readonly chatService: ChatService){}

  handleConnection(client: Socket) {
    client.broadcast.emit("new_user", {
      message: `${client.id} joined the chat`
    })
  }

  handleDisconnect(client: Socket) {
    this.server.emit('left_chat', {
      message: `${client.id} left the chat`
    })
  }

  @SubscribeMessage(CREATE_MESSAGE)
  handleMessage(@MessageBody() createMessageDto: CreateMessageDto, @ConnectedSocket() client: Socket){
    const message = this.chatService.create(createMessageDto);
    client.broadcast.emit('message', {
      name: message.name,
      text: message.text
    })
  }

  // @SubscribeMessage(ALL_MESSAGES)
  // findAll(@ConnectedSocket() client: Socket){
  //   const history = this.chatService.findAll()
  //   client.emit('allMessages', history)
  // }

  @SubscribeMessage(TYPING)
  typing(@MessageBody() data: { isTyping: boolean; name: string }, @ConnectedSocket() client: Socket) {
    client.broadcast.emit('typing', {
      name: data.name,
      isTyping: data.isTyping
    });
  }
}
