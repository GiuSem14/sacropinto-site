import useVariant from "../../hooks/useVariant"
import HeroReel from "./hero/HeroReel"
import HeroSplit from "./hero/HeroSplit"
import HeroEngraved from "./hero/HeroEngraved"
import HeroWall from "./hero/HeroWall"

const HEROES = { a: HeroReel, b: HeroSplit, c: HeroEngraved, d: HeroWall }

export default function Hero() {
  const variant = useVariant("hero")
  const Component = HEROES[variant] ?? HeroReel
  return <Component />
}
