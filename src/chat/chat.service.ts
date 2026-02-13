import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
    private messages: CreateMessageDto[] = [{name: 'System', text: 'Welcome to the chat!'}]

    create(message: CreateMessageDto){
        this.messages.push(message)
        return message
    }

    findAll(){
        return this.messages
    }
}
