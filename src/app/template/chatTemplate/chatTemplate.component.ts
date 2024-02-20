import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TextMessageBoxEvent,
  TextMessageEvent,
  TypingLoaderComponent,
} from '@components/index';
import { IMessage } from '@interfaces/message.interface';
import { OpenAIService } from '@services/openai.service';

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {
  public messages = signal<IMessage[]>([{ text: 'Hello', isGpt: true }]);
  public isLoading = signal<boolean>(false);
  public openAIService = inject(OpenAIService);

  handleMessage(prompt: string) {
    console.log('message', prompt);
  }

  // handleMessageWithFile({ prompt, file }: TextMessageEvent) {
  //   console.log({
  //     prompt,
  //     file,
  //   });
  // }

  // handleMessageWithSelect(inn: TextMessageBoxEvent) {
  //   console.log(
  //     '🚀 ~ OrthographyPageComponent ~ handleMessageWithSelect ~ inn:',
  //     inn
  //   );
  // }
}
