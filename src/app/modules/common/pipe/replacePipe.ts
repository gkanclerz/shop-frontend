import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'replace'
})
export class ReplacePipe implements PipeTransform{
    transform(value: string, strToReplace: string, replacmentStr: string) {
        if(!value || !strToReplace || !replacmentStr){
            return value;
        }
        return value.replace(new RegExp(strToReplace, 'g'), replacmentStr);
    }

}