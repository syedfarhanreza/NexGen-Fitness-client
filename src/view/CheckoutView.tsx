/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import ShoppingCartIcon from "@/icons/ShoppingCartIcon";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { useOrderManyProductMutation } from "@/redux/features/product/product.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useFormik } from "formik";
import { CreditCardIcon, DollarSignIcon } from "lucide-react";
import { useState } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  name: "",
  email: "",
  address: "",
};

const CheckoutView = () => {
  const { total, items } = useAppSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethodd] = useState<"cash" | "card">("card");
  const [confirmOrder] = useOrderManyProductMutation();

  const [phone, setPhone] = useState("");

  const dispatch = useAppDispatch();

  const naviagate = useNavigate();
  if (!total) {
    naviagate("/");
  }
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("email is required"),
    address: Yup.string().required("Address is required"),
  });
  const handleSubmit = async () => {
    if (!phone) {
      return toast.error("Please enter your phone number");
    }
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      return toast.error("Invalid Phone number");
    }

    if (paymentMethod === "card") {
      return naviagate("/payment");
    }

    const toastId = toast.loading("Please wait...");
    try {
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
      naviagate("/confirm");
    } catch (error) {
      toast.error("Something went wrong please tru again");
    } finally {
      toast.dismiss(toastId);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex flex-col min-h-screen container">
      <div className="flex items-center justify-between bg-background px-4 py-3 shadow-sm sm:px-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 px-4 py-8 sm:px-6 grid md:grid-cols-2 md:gap-8 gap-12">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter your address"
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-600">{formik.errors.address}</div>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>

              <PhoneInput
                id="phone"
                name="phone"
                defaultCountry="BD"
                international
                countryCallingCodeEditable={false}
                placeholder="Enter your phone number"
                onChange={(e) => setPhone(e as string)}
                className="flex  w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primaryMat text-white font-[700]"
            >
              Place Order
            </Button>
          </form>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                onValueChange={(e) => setPaymentMethodd(e as "cash" | "card")}
                defaultValue={paymentMethod}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="cash"
                    id="payment-cash"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="payment-cash"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <DollarSignIcon className="mb-3 h-6 w-6" />
                    Cash on Delivery
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="card"
                    id="payment-card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="payment-card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCardIcon className="mb-3 h-6 w-6" />
                    Credit/Debit Card
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default CheckoutView;
