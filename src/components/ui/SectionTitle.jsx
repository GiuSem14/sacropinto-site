import Reveal from "./Reveal"

export default function SectionTitle({ title, subtitle, light = true, center = false }) {
  return (
    <Reveal className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2 className={`font-display font-normal text-4xl md:text-6xl leading-[1.05] tracking-[-0.01em] mb-4 ${light ? "text-white" : "text-black"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-gray-400" : "text-gray-600"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
