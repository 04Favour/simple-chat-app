import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ChatService implements OnModuleInit {
  // Path to your JSON file
  private readonly filePath = path.join(process.cwd(), 'chat-history.json');
  private messages: CreateMessageDto[] = [];

  // This runs as soon as the module starts
  onModuleInit() {
    this.loadMessages();
  }

  create(createMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createMessageDto,
      timestamp: new Date(),
    };
    
    this.messages.push(newMessage);
    // this.saveMessages(); // Save to disk!
    return newMessage;
  }

  findAll() {
    return this.messages;
  }

  private saveMessages() {
    // Convert array to string and write to file
    fs.writeFileSync(this.filePath, JSON.stringify(this.messages, null, 2));
  }

  private loadMessages() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        this.messages = JSON.parse(data);
      }
    } catch (error) {
      console.error('Could not load chat history', error);
      this.messages = [];
    }
  }
}