import { Component, ElementRef, ViewChild } from '@angular/core';
import { OpenAiApiService } from '../services/open-ai-api.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [];
  @ViewChild('target')
  private myScrollContainer!: ElementRef;
  
  constructor(private openAiApiService: OpenAiApiService) { }

  sendMessage() {
    const userMessage = this.userMessage;
    this.chatMessages.push({ role: 'user', content: userMessage });
    this.openAiApiService.sendMessage(this.userMessage)
      .subscribe(response => {
        this.assistantReply = response.reply;
        this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
        this.userMessage = '';
      });
  }
  ngAfterViewChecked() {
    console.log("Saw some changes");
    this.scrollToElement();
  }

  scrollToElement(): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
 
}
