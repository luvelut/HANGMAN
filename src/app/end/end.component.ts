import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EndComponent>,@Inject(MAT_DIALOG_DATA) public data: {word: string[], isWin: boolean}) { }

  ngOnInit(): void {
  }

  close() {
  	this.dialogRef.close();
  }

}
