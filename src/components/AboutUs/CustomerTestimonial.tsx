import { customerReviews } from "@/mock/review";

const CustomerTestimonial = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">What Our Customers Say</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {customerReviews.map(({ location, review, userName }, i) => (
            <div
              className="bg-background rounded-lg p-6 shadow-sm"
              key={i + "review"}
            >
              <blockquote className="text-lg font-semibold leading-snug">
                "{review}"
              </blockquote>
              <div className="mt-4 text-muted-foreground">
                - {userName}, {location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonial;
