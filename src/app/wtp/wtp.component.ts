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
  randomPickedPokemon!:PokeMonElasticDetail;
  randomPickedEECharacter!:EECharacter;
  themeSong = new Audio();
  allowOption:boolean=false;
  whoSThatPokemonAudio=new Audio();
  shouldDarken:boolean=true;
  constructor(private elasticService: ElasticService){}
ngOnInit() {
    this.elasticService.getEECharacter().subscribe((eeCharacters) => {
      const randomId = Math.floor(Math.random() * eeCharacters.length) + 1;
const picked = eeCharacters.find(c => c.id === randomId);
if(picked!=undefined){
      this.randomPickedEECharacter = picked;
}
    });
    this.whoSThatPokemonAudio.src = 'assets/audio/Whos20that20Pokemon.mp3';
    this.whoSThatPokemonAudio.load();
    this.whoSThatPokemonAudio.loop = false;
    this.whoSThatPokemonAudio.volume = 1.0;
    this.whoSThatPokemonAudio.play();
    setTimeout(() => {
      this.allowOption = true;
    }, 8000);
  }
onOptionClick(option:String){
  if(option==this.randomPickedEECharacter.name){
    this.shouldDarken=!this.shouldDarken;
  }
  this.themeSong.src = 'http://localhost:9000' + this.randomPickedEECharacter.voiceUrl;
  this.themeSong.load();
  this.themeSong.loop = false;        
  this.themeSong.volume = 1.0;       
  this.themeSong.play();
  setTimeout(()=>{
  this.themeSong.src = 'http://localhost:9000' + this.randomPickedEECharacter.themeSongUrl;
  this.themeSong.load();
  this.themeSong.loop = true;        
  this.themeSong.volume = 0.3;       
  this.themeSong.play();
  },2015)
}
 
}
