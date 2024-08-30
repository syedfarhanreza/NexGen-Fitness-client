const CompanyOverview = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Company Overview</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Our History</h3>
                <p>
                  NeXGen Fitness began its journey in 2008 when founders Sarah
                  Williams and Michael Thompson set out to create superior
                  fitness products from their garage in Austin, Texas. Their
                  first innovation, an ergonomic and long-lasting resistance
                  band, quickly became a staple in the local fitness community,
                  marking the start of NeXGen Fitness's evolution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
                <p>
                  At NeXGen Fitness, our mission is to empower people on their
                  fitness paths by delivering top-tier, innovative accessories
                  that enhance performance, promote well-being, and instill
                  confidence. We are committed to making fitness attainable for
                  everyone, offering products that are not only durable and
                  affordable but also thoughtfully designed to meet the needs of
                  our users. We continually strive for excellence and
                  improvement, aiming to be your trusted partner in leading a
                  healthier, stronger, and more active lifestyle.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Our Vision</h3>
                <p>
                  NeXGen Fitness envisions becoming the world’s foremost
                  provider of high-quality fitness accessories, celebrated for
                  our innovation, quality, and customer-first philosophy. We
                  aspire to inspire and support a global community of fitness
                  enthusiasts, promoting a culture of health, wellness, and
                  active living. Through continuous evolution and expansion of
                  our product line, we aim to set new benchmarks in the fitness
                  industry, helping individuals reach their personal best each
                  and every day.
                </p>
              </div>
            </div>
          </div>
          <div>
            <img
              src="/images/company.jpg"
              alt="Company Overview"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center w-[550px] h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
