import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-quest-dialog',
  templateUrl: './add-quest-dialog.component.html',
  styleUrls: ['./add-quest-dialog.component.scss']
})
export class AddQuestDialogComponent implements OnInit {
  public categoryList: Array<String> = [
    QuestCategories.CERTIFICATION,
    QuestCategories.FUNCTIONAL,
    QuestCategories.INFOR_SPECIFIC,
    QuestCategories.SOFT_SKILL,
    QuestCategories.TECHNICAL
  ];
  public playerQuest: PlayerQuest;
  public user: User;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { user: User, lead: User },
    private dialogRef: MatDialogRef<AddQuestDialogComponent>) {}

  adjustQuestType(required: boolean) {
    this.playerQuest.required = required;
  }

  assignQuest() {
    this.dialogRef.close(this.playerQuest);
  }

  ngOnInit() {
    this.user = this.data.user;
    const lead = this.data.lead;
    // will need to recoordinate team id, we get it now from membership collection
    this.playerQuest = {
      playerId: this.user.uid,
      required: true,
      playerName: this.user.displayName,
      teamId: this.user.membership.teamId,
      status: 'todo',
      playerEmail: this.user.email,
      teamLeadEmail: lead.email
    } as PlayerQuest;
  }
}
