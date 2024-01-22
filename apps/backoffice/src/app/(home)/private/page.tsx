import Section from "@repo/ui/section";
import { getRestaurantsNameByUser } from "src/actions/restaurant.actions";

import SectionTitle from "../../../../../../packages/ui/src/section-title";
import SectionBody from "@repo/ui/section-body";
import RestaurantList from "./components/restaurant-list";
import ReserveList from "./components/reserve-list";
import ReviewList from "./components/review-list";

export default async function Page(): Promise<JSX.Element> {
  const restaurants = await getRestaurantsNameByUser();
  console.log({ restaurants });
  return (
    <Section>
      <SectionTitle>Bienvenido</SectionTitle>
      <SectionBody>
        <RestaurantList restaurants={restaurants} />
        <ReserveList />
        <ReviewList />
      </SectionBody>
    </Section>
  );
}
