export default function SectionTitle({ title, subtitle, light = false, center = false }) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2 className={`text-3xl md:text-4xl font-bold tracking-tight mb-3 ${light ? "text-white" : "text-black"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-gray-400" : "text-gray-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}