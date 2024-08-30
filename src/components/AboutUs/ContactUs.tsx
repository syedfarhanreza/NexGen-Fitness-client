import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactUs = () => {
  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get in Touch
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We’re eager to connect with you. Whether you have a question,
                feedback, or a service inquiry, feel free to reach out to us
                anytime.
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Our team is committed to delivering top-notch customer service
                and will respond to your message as quickly as possible.
              </p>
            </div>
            <div className="bg-background rounded-lg shadow-lg p-6 md:p-8">
              <form className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter the subject" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    className="min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Contact Us
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We're here for you. If you need any assistance or more details,
                don't hesitate to get in touch.
              </p>
            </div>
            <div className="bg-background rounded-lg shadow-lg p-6 md:p-8 space-y-4">
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Address</h3>
                <p className="text-muted-foreground">
                  123 Main Street
                  <br />
                  Bogura, Bangladesh
                </p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Phone</h3>
                <p className="text-muted-foreground">(+880)01799999999</p>
              </div>
              <div className="grid gap-2">
                <h3 className="text-lg font-bold">Email</h3>
                <p className="text-muted-foreground">
                  nexgen.fitness@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
