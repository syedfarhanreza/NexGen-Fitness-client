import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CircleCheckIcon from "@/icons/CircleCheckoutIcon";
import { format } from "date-fns";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmedOrder = () => {
  const total = localStorage.getItem("amount");
  console.log(total);

  const navigate = useNavigate();
  console.log(total);

  useEffect(() => {
    if (!total) {
      navigate("/");
    }
  }, [total, navigate]);

  const handleGotoHome = () => {
    localStorage.removeItem("ammount");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md p-6 md:p-8">
        <CardHeader>
          <CircleCheckIcon className="text-green-500 size-12" />
          <CardTitle className="mt-4">Order Confirmed</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            Thank you for your order!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Order #</span>
                <span className="font-medium">12345</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {format(new Date(), "MMM dd, yyyy")}
                </span>
              </div>
              <Separator />

              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>${Number(total?.toString())}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button
            onClick={handleGotoHome}
            className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Go to Homepage
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConfirmedOrder;
