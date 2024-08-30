import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { teamMembers } from "@/mock/teamMember";

const OurTeam = () => {
  return (
    <section className="bg-muted py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">Meet Our Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map(({ bio, jobTitle, name, tag, image }, i) => (
            <div
              className="bg-background rounded-lg p-6 shadow-sm"
              key={i + "team"}
            >
              <div className="flex items-center mb-4">
                <Avatar className="group overflow-hidden">
                  <AvatarImage
                    src={image}
                    alt={`${name}'s photo`}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <AvatarFallback>{tag}</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-muted-foreground">{jobTitle}</p>
                </div>
              </div>
              <p>{bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
