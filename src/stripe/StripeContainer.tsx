import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { useOrderManyProductMutation } from "@/redux/features/product/product.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const StripeContainer = () => {
  const [Carderror, setCardError] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const [confirmOrder] = useOrderManyProductMutation();
  const { total, items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const elements = useElements();
  const stripe = useStripe();

  if (!total) {
    navigate("/");
  }

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (loading) {
      return;
    }
    if (!stripe || !elements) {
      setCardError("Stripe.js has not loaded yet. Please try again later.");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setCardError(
        "Card element not found. Please refresh the page and try again."
      );
      return;
    }

    setLoading(true);
    setCardError(null);

    try {
      const BASEURL = import.meta.env.VITE_BASE_API as string;
      const response = await fetch(`${BASEURL}/payment/create-intent`, {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent.");
      }

      const { data: clientSecret } = await response.json();
      console.log({ clientSecret });

      // Confirm the Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: "user@mail.com",
          },
        },
      });

      const errMessage = result.error?.message || "";
      const displayErr = [
        "Your card number is incomplete.",
        "Your card's expiration date is incomplete.",
        "Your card's security code is incomplete.",
      ];

      if (displayErr.includes(errMessage)) {
        return setCardError(`Payment failed: ${errMessage}`);
      }

      if (result.error) {
        toast.error("Something went wrong, try again later");
        console.log(result.error);
      } else if (result.paymentIntent.status === "succeeded") {
        const { data } = await confirmOrder({ cartItems: items });
        if (!data) {
          return toast.error("An unkown error occurd");
        }
        if (!data.success) {
          return toast.error(data.message || "Failed to create order");
        }

        toast.success("Order confirmed");
        localStorage.setItem("amount", total.toString());
        dispatch(clearCart(undefined));
        navigate("/confirm");
      }
    } catch (error) {
      toast.error("Something went wrong while making this payment");
      setLoading(false);
    }
  };
  const loader = (
    <span className="flex items-center justify-center gap-[5px]">
      Payment Processing
      <span className="rounded-md h-[25px] w-[25px] border-4 border-t-4 border-primaryMat animate-spin" />
    </span>
  );
  return (
    <div className="h-screen w-full center">
      <Card className="w-[750px] p-[10px]">
        <CardHeader>
          <Link
            to={"/checkout"}
            className="flex items-center gap-[10px] mb-[15px]"
          >
            <ArrowLeft className="w-[20px]" />
            <span className="text-primaryTxt text-[18px] font-[600px]">
              Go back
            </span>
          </Link>

          <CardTitle className="mt-4">Confirm you card detials</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            Thank you for your order!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePayment}>
            <div className="flex flex-col gap-[8px] w-full">
              <label htmlFor="card-nr" className="label">
                Card number
              </label>
              <div className="px-[20px] w-full flex justify-center items-center h-[50px] border-[1px] border-[#E2E8F0] rounded-[15px]">
                <CardNumberElement
                  id="card-nr"
                  className="text-[16px] font-[500] bg-white w-full text-[#B4BFCD]"
                />
              </div>
            </div>

            <div className="flex items-start justify-start gap-[22px] w-full mt-[20px]">
              <div className="flex flex-col gap-[8px] w-full">
                <label htmlFor="card-ex" className="label">
                  Card expiry
                </label>
                <div className="px-[20px] w-full flex justify-center items-center h-[50px] border-[1px] border-[#E2E8F0] rounded-[15px]">
                  <CardExpiryElement
                    id="card-ex"
                    className="text-[16px] font-[500] bg-white w-full text-[#B4BFCD]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <label htmlFor="card-cv" className="label">
                  CVC
                </label>
                <div className="px-[20px] w-full flex justify-center items-center h-[50px] border-[1px] border-[#E2E8F0] rounded-[15px]">
                  <CardCvcElement
                    id="card-cv"
                    className="text-[16px] font-[500] bg-white w-full text-[#B4BFCD]"
                  />
                </div>
              </div>
            </div>
            {Carderror && <div className="error">{Carderror}</div>}
            <Button
              className="w-full mt-[40px]"
              type="submit"
              disabled={loading}
            >
              {loading ? loader : "Pay by card"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StripeContainer;
