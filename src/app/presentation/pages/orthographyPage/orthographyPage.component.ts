import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IMessage } from '@interfaces/index';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
  TextMessageBoxFileComponent,
  TextMessageEvent,
  TextMessageBoxSelectComponent,
  TextMessageBoxEvent,
} from '@components/index';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {
  public messages = signal<IMessage[]>([
    {text: 'Hello', isGpt: true},
  ]);
  public isLoading = signal<boolean>(false);

  handleMessage(prompt: string) {
    console.log('message', prompt);
  }

  handleMessageWithFile({ prompt, file }: TextMessageEvent) {
    console.log({
      prompt,
      file,
    });
  }

  handleMessageWithSelect(inn: TextMessageBoxEvent) {
    console.log(
      '🚀 ~ OrthographyPageComponent ~ handleMessageWithSelect ~ inn:',
      inn
    );
  }
}
