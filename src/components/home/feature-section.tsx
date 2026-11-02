
import {
  CalendarDays,
  Users,
  HeartHandshake,
  MapPin,
  Bell,
  HandHeart,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Discover Local Events",
    description:
      "Explore exciting community events and find volunteering opportunities near you.",
  },
  {
    icon: CalendarDays,
    title: "Easy Event Registration",
    description:
      "Join your favorite events with a simple and hassle-free registration process.",
  },
  {
    icon: HeartHandshake,
    title: "Make an Impact",
    description:
      "Turn your passion into action and make a meaningful difference in your community.",
  },
  {
    icon: Users,
    title: "Manage Your Events",
    description:
      "Keep track of your registered events and manage your volunteering activities.",
  },
  {
    icon: Bell,
    title: "Stay Updated",
    description:
      "Never miss important announcements and updates about upcoming events.",
  },
  {
    icon: HandHeart,
    title: "Build Connections",
    description:
      "Connect with like-minded people and grow a stronger, more supportive community.",
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-background px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Why Choose ServeUp?
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Everything You Need to
            <span className="text-primary"> Make a Difference</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground md:text-lg">
            ServeUp makes it easier to discover events, connect with
            volunteers, and create a positive impact in your community.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
