import CompanyOverview from "@/components/AboutUs/CompanyOverview";
import ContactUs from "@/components/AboutUs/ContactUs";
import CustomerTestimonial from "@/components/AboutUs/CustomerTestimonial";

import OurTeam from "@/components/AboutUs/OurTeam";

const AboutUsView = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <CompanyOverview />
        <OurTeam />
        <CustomerTestimonial />
        <ContactUs />
      </main>
    </div>
  );
};

export default AboutUsView;
