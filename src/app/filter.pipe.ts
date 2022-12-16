import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(slides: any, price: any, slideBuy:any, priceBuy:any): any {
    if(price===undefined) 
    return slides;

    return slides.filter(function(sld){
      return sld.price === price
    })
    
    if(priceBuy===0) 
    return slideBuy.price>=0;

    // return slideBuy.filter(function(slb){
    //   return slb.price != priceBuy
    // })

  }

  

}
