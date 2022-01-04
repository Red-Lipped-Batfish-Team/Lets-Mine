require("dotenv").config();
const stripeAPI = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const webHookController = (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeAPI.webhooks.constructEvent(
      req["rawBody"],
      sig,
      process.env.WEB_HOOK_SECRET
    );
  } catch (error) {
    return res.status(400), send(`webhook error: ${error}`);
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log(session);

    
  }
};

module.exports = webHookController;
