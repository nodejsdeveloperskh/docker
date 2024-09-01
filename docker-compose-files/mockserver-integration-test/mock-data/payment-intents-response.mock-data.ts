export function createPaymentIntentsResponse(amount: number) {
  return {
    statusCode: 200,
    body: {
      id: 'pi_3MtwBwLkdIwHu7ix28a3tqPa',
      object: 'payment_intent',
      amount,
      amount_capturable: 0,
      amount_details: {
        tip: {},
      },
      amount_received: 0,
      application: null,
      application_fee_amount: null,
      automatic_payment_methods: {
        enabled: true,
      },
      canceled_at: null,
      cancellation_reason: null,
      capture_method: 'automatic',
      client_secret:
        'pi_3MtwBwLkdIwHu7ix28a3tqPa_secret_YrKJUKribcBjcG8HVhfZluoGH',
      confirmation_method: 'automatic',
      created: 1680800504,
      currency: 'jpy',
      customer: null,
      description: null,
      invoice: null,
      last_payment_error: null,
      latest_charge: null,
      livemode: false,
      metadata: {},
      next_action: null,
      on_behalf_of: null,
      payment_method: null,
      payment_method_options: {
        card: {
          installments: null,
          mandate_options: null,
          network: null,
          request_three_d_secure: 'automatic',
        },
        link: {
          persistent_token: null,
        },
      },
      payment_method_types: ['card', 'link'],
      processing: null,
      receipt_email: null,
      review: null,
      setup_future_usage: null,
      shipping: null,
      source: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: 'requires_payment_method',
      transfer_data: null,
      transfer_group: null,
    },
  };
}
