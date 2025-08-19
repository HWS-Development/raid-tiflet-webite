export default function RoomCanvas({ color, children }) {
    // color = hex from the room object (e.g., "#2F8F5B")
    return (
      <section
        style={{ "--room": color || "#C94F44" }}
        className="relative"
      >
        {/* full canvas */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `linear-gradient(180deg, var(--room) 0%, color-mix(in oklab, var(--room) 80%, #000 0%) 100%)`
          }}
        />
        {children}
      </section>
    );
  }
  