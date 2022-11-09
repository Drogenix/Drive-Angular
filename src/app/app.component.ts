import {Component} from '@angular/core';
import {animate, group, keyframes, query, style, transition, trigger} from "@angular/animations";
import {ChildrenOutletContexts} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({position: 'relative'}),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            height:'100%',
            width:'100%'})
        ], {optional:true}),
        query(':enter', [style({opacity:0, top:'-8px'})], {optional:true}),
        group( [
          query(':enter',[
            animate('1.2s', keyframes([
              style({opacity:0, offset:0.5}),
              style({opacity:1, top:0, offset:1})
            ]))
          ],{optional:true}),
          query(':leave', [
            animate('0.6s', style({opacity:0, top:'-8px'}))
          ], {optional:true})
        ], )
      ])
    ])
  ]
})
export class AppComponent{
  title = 'Bonum Drive';

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }


}
