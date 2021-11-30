# Angular Stripe Service

Stripe service used to integrate Stripe Elements with Angular.

## Documentation

[Integrating Stripe Elements with Angular](https://developer.fireflysemantics.com/tasks/tasks--angular--integrating-stripe-elements-with-angular)

## Stackblitz

[Stackblitz Demo](https://stackblitz.com/edit/angular-stripe-integration-fs)

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

## Why?

The `@fireflysemantics/angular-stripe-service` service injects the Stripe scripts for us and waits for it to load before attempting to initialize elements.

The reason this is important is that if our component containing the Stripe form is loaded before Stripe has a chance to initialize elements then the form will not paint correctly.

In other words the Stripe API download and subsequent elements construction is racing the construction of the credit card form component.

If the form component wins that race, the component does not get constructed right, because elements is not yet available.