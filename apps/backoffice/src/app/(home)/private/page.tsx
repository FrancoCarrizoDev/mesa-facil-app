import Section from "@repo/ui/section";
import { getRestaurantsNameByUser } from "src/actions/restaurant.actions";

import SectionTitle from "@repo/ui/section-title";
import SectionBody from "@repo/ui/section-body";
import RestaurantList from "./components/restaurant-list";
import ReserveList from "./components/reserve-list";
import ReviewList from "./components/review-list";

export default async function Page(): Promise<JSX.Element> {
  const restaurants = await getRestaurantsNameByUser();

  return (
    <Section>
      <div className="mb-6">
        <SectionTitle>Bienvenido</SectionTitle>
      </div>
      <SectionBody>
        <div className="flex gap-3 itesm-center justify-between">
          <RestaurantList restaurants={restaurants} />
          <ReserveList />
          <ReviewList />
        </div>
      </SectionBody>
    </Section>
  );
}
