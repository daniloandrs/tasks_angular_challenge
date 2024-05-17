import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagLocalService } from '../../../../services/tag-local.service';
import { Tag } from '../../../../models/task.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

    form!: FormGroup;

    tagsStored: Tag[] = [];

    @Input({ required: true }) tags: Tag[] = [];
    @Output() tagsChange = new EventEmitter<Tag[]>();

    constructor(
        private tagService: TagLocalService,
        private fb: FormBuilder
    ) { }
  
    ngOnInit(): void {
      this.loadTags();
      this.buildForm()
    }
  

    get tagsGroup() : FormArray {
      return this.form.get("tags") as FormArray
    }

    loadTags(): void {
      this.tagService.getAllTags().subscribe({
          next: tags =>{
            this.tagsStored = tags
            tags.forEach(tag => {
              this.insertTag(tag)
            })
          }
      });
    }

    createtag (event:any) : void {
      const tag  = this.newTag()
      const {check, ...value}  = tag.value
      this.tagService.createTags(value).subscribe({
        next: () => {
          this.tagsStored.push(value)
          this.tagsGroup.push(tag)
        }
    });

      event.stopPropagation();
    }


    save(item:AbstractControl) {
      item.patchValue({
        edit:!item.value.edit
      })
      this.tagService.updateTags(item.value).subscribe()
    }

    modeEdit (item:AbstractControl) {
      item.patchValue({
        edit:!item.value.edit
      })
    }

    private insertTag = (item: Tag | null = null) => {
      const detail = this.newTag();
      if (item) {
        detail.patchValue({
          key: item.key,
          color: item.color,
          name: item.name,
          edit: item.edit,
          check:false
        });
        const tagCheck = this.tags.find(aux => aux.key === item.key)
        if (tagCheck) {
          detail.patchValue({
            check:true
          })
        }
      }
      this.tagsGroup.push(detail);
    };

    private newTag(): FormGroup {
      return new FormGroup({
        key : new FormControl(this.generateRandomKey(16)),
        color : new FormControl('#0055CC'),
        name : new FormControl('Nueva etiqueta'),
        edit: new FormControl(false),
        check:new FormControl(false)
      });
    }

    buildForm () {
      this.form = this.fb.group({
        tags: this.fb.array([])
      });
    }

    onSaveTag (key:string) {
      const checks: Tag[] = this.tagsGroup.controls.map(item => (item.value))
        .filter(item => item.check)
        .map(item => ({
          color:item.color,
          name:item.name,
          key:item.key,
        }))
      
      this.tagsChange.emit(checks)
    }

    generateRandomKey(length:16):string {
      const randomBytes = new Uint8Array(length);
      crypto.getRandomValues(randomBytes);
      return Array.from(randomBytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
    }
 }
