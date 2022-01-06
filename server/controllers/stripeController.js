const db = require("../models/db");
require("dotenv").config();

const stripeController = {};

const domainURL = process.env.WEB_APP_URL;

stripeController.createCheckoutSession = async (req, res) => {
    try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
            quantity: item.quantity,
            price_data: {
              currency: "usd",
              unit_amount: item.price * 100, // amount is in cents
              product_data: {
                name: item.title,
                description: item.description,
                images: [item.imageUrl],
              },
            },
          }
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
  
    res.redirect(303, session.url);
    return next();
} catch(err) {
    return res.status(400).send(err.message);
}
  };

  module.export = stripeController;