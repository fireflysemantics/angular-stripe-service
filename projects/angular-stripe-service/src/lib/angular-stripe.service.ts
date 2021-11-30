import { Injectable } from '@angular/core';
import { Stripe, StripeFactory } from './types';

const STRIPE_API_URL = "https://js.stripe.com/v3/";

@Injectable({
  providedIn: 'root'
})
/**
 * This service has a `stripe` property to that gets
 * initialized to `window["Stripe"]`.
 * 
 * The constructor calls `inject()` which will
 * inject a script tag with containing the URL that loads
 * stripe and return a `Promise<StripeFactory>`.
 * 
 * The script tag will only load stripe if 
 * c is not available.
 * 
 * If `window["Stripe"]` is available then `inject()` resolves 
 * the promise with that instance immediately, and does not create and 
 * wait for the script tag to load.
 * 
 *  
 */
export class AngularStripeService{

  private _stripe:StripeFactory = window['Stripe']
  private stripePromise:Promise<any>

  constructor() { 
    this.stripePromise = this.inject()
  }

  get stripe() {
    return this._stripe;
  } 
  set stripe(s:StripeFactory) {
    this._stripe = s;
  }

  setPublishableKey(key:string, options?:any):Promise<Stripe>{
    return this.stripePromise.then( () => {
      return this.stripe(key, options)
    })
  }

  inject():Promise<StripeFactory>{

    if( this.stripe ){
      return Promise.resolve( this.stripe )
    }

    return new Promise((res,rej)=>{
      const head = this.getHeadElement()
      const script = document.createElement("script")
      script.setAttribute("type", "text/javascript")
      script.setAttribute("src", STRIPE_API_URL)      
      head.appendChild(script)      
      script.addEventListener("load",()=>{
        this.stripe = window["Stripe"];
        res( this.stripe )
      })
    })
  }

  /**
   * Returns the `head` element.
   * @throws Error('Application does not have a head element');
   */
  getHeadElement(){
    let elm:HTMLElement = document.getElementsByTagName("head")[0]

    if(!elm) {
      throw new Error('Application does not have a head element');
    }    
    return elm;
  }  
}
