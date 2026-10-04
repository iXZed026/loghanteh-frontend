import Container from '@/components/shared/Container'
import PaymentSuccessHeader from '@/features/loghante(root)/payment/payment-success/components/PaymentSuccessHeader'
import TicketPaymentSummary from '@/features/loghante(root)/payment/payment-success/components/TicketPaymentSummary'
import React from 'react'

function PaymentSuccess() {
  return (
    <div className='py-15'>
      <Container>
        <div className='fcol gap-10'>
          <PaymentSuccessHeader />
          <TicketPaymentSummary/>
        </div>
      </Container>
    </div>
  )
}

export default PaymentSuccess