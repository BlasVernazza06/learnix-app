'use server'

import { headers } from 'next/headers'
import { stripe } from '../lib/stripe'
import { createClient } from '@/utils/supabase/server' // ajusta según tu path

export async function fetchClientSecret(PRICE_ID) {
  const origin = (await headers()).get('origin')

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    payment_method_types: ['card'],
    line_items: [
      {
        price: PRICE_ID,
        quantity: 1
      }
    ],
    mode: 'subscription',
    return_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret
}

export async function POST(req) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Creamos supabase server client
  const supabase = await createClient()

  // Según el tipo de evento de Stripe
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // El email del comprador
    const email = session.customer_details?.email

    if (email) {
      // Actualizamos el perfil del usuario en Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ is_subscribed: true })
        .eq('email', email)

      if (error) {
        console.error('Error updating subscription:', error.message)
      } else {
        console.log(`User ${email} subscribed ✅`)
      }
    }
  }

  return new Response('ok', { status: 200 })
}
