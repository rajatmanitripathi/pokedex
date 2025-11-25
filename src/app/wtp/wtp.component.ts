import { Component } from '@angular/core';
import { PokeMonElasticDetail } from '../models/pokemonAPIModels';
import { EECharacter } from '../models/eeCharacterModel';
import { ElasticService } from '../elastic.service';

@Component({
  selector: 'app-wtp',
  templateUrl: './wtp.component.html',
  styleUrl: './wtp.component.scss'
})
export class WtpComponent {
  index:number=0;
  displayText:String = '';
  randomPickedPokemon!: PokeMonElasticDetail;
  randomPickedEECharacter!: EECharacter;
  shouldMakeTransparent: boolean = false;
  themeSong = new Audio();
  allowOption: boolean = false;
  gameStarted: boolean = false;
  whoSThatPokemonAudio = new Audio();
  shouldDarken: boolean = true;
  constructor(private elasticService: ElasticService) { }
  ngOnInit() {
    this.elasticService.getEECharacter().subscribe((eeCharacters) => {
      const randomId = Math.floor(Math.random() * eeCharacters.length) + 1;
      const picked = eeCharacters.find(c => c.id === randomId);
      if (picked != undefined) {
        this.randomPickedEECharacter = picked;
      }
    });
  }
  typeWriter() {
  if (this.index < this.randomPickedEECharacter.bio.length) {
    this.displayText += this.randomPickedEECharacter.bio.charAt(this.index);
    this.index++;
    setTimeout(() => this.typeWriter(), 40);
  }
}
  onOptionClick(option: String) {
    if (option == this.randomPickedEECharacter.name) {
      this.shouldDarken = !this.shouldDarken;
      this.themeSong.src = 'http://localhost:9000' + this.randomPickedEECharacter.voiceUrl;
      this.themeSong.load();
      this.themeSong.onloadedmetadata = () => {
        this.themeSong.play();

        const lengthMs = this.themeSong.duration * 1000;

        console.log("Duration in ms:", lengthMs);

        setTimeout(() => {
          this.shouldMakeTransparent = true;
          this.typeWriter();
          this.themeSong.src = 'http://localhost:9000' + this.randomPickedEECharacter.themeSongUrl;
          this.themeSong.load();
          this.themeSong.loop = true;
          this.themeSong.volume = 0.3;
          this.themeSong.play();
        }, lengthMs);

      };
    }
  }
  startGame() {
    this.gameStarted = !this.gameStarted;
    this.whoSThatPokemonAudio.src = 'assets/audio/Whos20that20Pokemon.mp3';
    this.whoSThatPokemonAudio.load();

    this.whoSThatPokemonAudio.onloadedmetadata = () => {

      const lengthMs = this.whoSThatPokemonAudio.duration * 1000;

      console.log("Duration in ms:", lengthMs);

      setTimeout(() => {
        this.allowOption = true;
      }, lengthMs - 2000);

      this.whoSThatPokemonAudio.play();
    };
  }

}
