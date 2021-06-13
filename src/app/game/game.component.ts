import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Letter } from '../letter';
import { ALPHABET, WORDS } from '../alphabet';
import { EndComponent } from '../end/end.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  try: number;
  word: string;
  words: string[];
  wordTab: Letter[] = [];
  alpha :Letter[];
  gameOver: null;
  form: FormGroup;

  constructor(public matDialog: MatDialog) { 
  	this.try = 0;
  	this.words = WORDS;
  	const random = Math.floor(Math.random() * this.words.length);
  	this.word=this.words[random];
  	Array.from(this.word).forEach( x => {
  		this.wordTab.push(new Letter(x));
  	});
  	this.alpha = ALPHABET;
  	this.form = new FormGroup({
  		wordInput : new FormControl(),
  	})
  }

  ngOnInit(): void {
  }

  onClick(letter: Letter) {
  	if(this.wordTab.filter( x => x.value == letter.value).length > 0) {
  		letter.isFound = true;
  		this.wordTab.filter( x => x.value == letter.value).forEach( x => {
  			x.isFound = true;
  		});
  		this.isWordFound();
  	
  	}
  	else {
  		letter.isFound = false;
  		this.try += 1;
  		if(this.try==10){
  			this.end();
  		}
  	}
  }

  onSubmit() {
  	var input = this.form.get('wordInput').value;
  	if(input == this.word) {
  		this.wordTab.forEach( x => x.isFound = true);
  		console.log("gagné");
  		this.end()
  	}
  	else {
  		console.log("nullos");
  		this.try += 1;
  		if(this.try==10){
  			this.end();
  		}
  	}
  }

  end() {
  	const dialogConfig = new MatDialogConfig();
  	dialogConfig.id="modal-component";
  	dialogConfig.height = "160px";
  	dialogConfig.width = "500px";
  	dialogConfig.disableClose=true;
  	if(this.try==10) {
  		var isWin=false;
  	}
  	else {
  		var isWin=true;
  	}
  	dialogConfig.data={
  		word:this.word,
  		isWin:isWin
  	}
  	const modalDialog = this.matDialog.open(EndComponent,dialogConfig);
  	modalDialog.afterClosed().subscribe(x => {
  		window.location.reload();
  	})
  }

  isWordFound(){
  	if(this.wordTab.filter( x => x.isFound == true).length == this.wordTab.length) {
  		this.end();
  	}
  }
}
