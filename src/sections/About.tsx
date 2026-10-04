import Section from '../components/Section';
import MindMap from '../components/MindMap';

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      kicker="Who am I?"
      title="Explore the network"
      subtitle="Not a paragraph — a map. Hover or tap a node to see how things connect, click to pin it."
    >
      <MindMap />
    </Section>
  );
}
