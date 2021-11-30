# Angular Stripe Service

Stripe service for for Angular components that use stripe.

## Usage

```
  constructor(
    private cd: ChangeDetectorRef,
    private stripeService:AngularStripeService) {}

  ngAfterViewInit() {
    this.stripeService.setPublishableKey('pk_test_2syov9fTMRwOxYG97AAXbOgt008X6NL46o').then(
      stripe=> {
        this.stripe = stripe;
    const elements = stripe.elements();    
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.cardHandler);
    });
}
```

## Stackblitz Demo

https://stackblitz.com/edit/angular-stripe-integration?file=src%2Fapp%2Fapp.component.ts

