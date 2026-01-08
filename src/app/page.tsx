import CycleCalculator from "./components/CycleCalculator";
import Header from "./components/Header";
import { ModernCreatorPanel } from "./components/ModerneCreatorPanel";

export default function Home() {
  return (
    <>
      <Header />
      <ModernCreatorPanel />
      <CycleCalculator />
    </>
  );
}
