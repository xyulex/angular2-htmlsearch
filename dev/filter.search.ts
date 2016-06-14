import {Injectable, Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: 'filterSearch'
})

@Injectable()
export class SearchPipe implements PipeTransform {
    transform(datas, args) {
    		return datas.filter(data => data.sourceCode.indexOf(args[0].sourceCode) !== -1);
    }
}