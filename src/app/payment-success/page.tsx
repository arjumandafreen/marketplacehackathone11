import Link from 'next/link'

export default function PaymentSuccess() {
  return (
    <div className="flex mt-10 flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mb-6">Your payment has been processed successfully. Thank you for your purchase!</p>
        
        <div className="space-y-9">
          <Link href="/shop">
            <p className="inline-block mb-2 text-center text-white bg-pink-500 hover:bg-green-700 px-6 py-2 rounded-lg w-full">
              Continue Shopping
            </p>
          </Link>
         
        </div>
      </div>
    </div>
  )
}