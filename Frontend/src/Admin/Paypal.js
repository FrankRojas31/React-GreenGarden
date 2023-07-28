import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPal = ({ total }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          // Aquí puedes realizar acciones después de que el pago es aprobado
          console.log("Pago aprobado:", data);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPal;