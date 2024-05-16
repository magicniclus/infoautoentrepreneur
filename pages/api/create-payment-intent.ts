import { NextApiRequest, NextApiResponse } from "next";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

type Item = {
  id: string;
  quantity: number;
};

const calculateOrderAmount = (items: Item[]): number => {
  // Remplacez cette constante par un calcul du montant de la commande
  return 6900; // Montant exemple
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items, customerInfo } = req.body;
  const { email, name, shippingAddress } = customerInfo;

  // Récupérer l'adresse IP du client
  const xForwardedFor = req.headers["x-forwarded-for"];
  let ip = Array.isArray(xForwardedFor)
    ? xForwardedFor[0]
    : xForwardedFor?.split(",").shift();
  ip = ip || req.socket?.remoteAddress;

  if (!email) {
    console.log("Missing email in request:", req.body);
    return res.status(400).json({ message: "Email is required" });
  }

  // Assurez-vous que les autres champs sont également présents
  if (
    !name ||
    !shippingAddress ||
    !shippingAddress.line1 ||
    !shippingAddress.city ||
    !shippingAddress.postal_code ||
    !shippingAddress.country
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      receipt_email: email,
      shipping: {
        name: name,
        address: shippingAddress,
      },
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("Stripe PaymentIntent creation failed:", error);
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
