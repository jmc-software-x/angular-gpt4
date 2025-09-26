import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
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
  GptMessageOrthographyComponent,
} from '@components/index';
import { OpenAIService } from '@services/openai.service';

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
    GptMessageOrthographyComponent
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {
  public messages = signal<IMessage[]>([]);
  public isLoading = signal<boolean>(false);
  public openAIService = inject(OpenAIService);

  handleMessage(prompt: string) {
    this.isLoading.set(true);

    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

    this.openAIService.checkOrthography(prompt).subscribe((response) => {
      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: response.message,
          info: response
        },
      ]);
    });
  }

  /* handleMessageWithFile({ prompt, file }: TextMessageEvent) {
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
  } */
}
