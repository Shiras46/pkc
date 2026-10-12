import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Event Management Services in Kochi | PKC Events',
  description: 'Premium event management services in Kochi by PKC Events. Specializing in destination weddings, corporate summits, and luxury catering.',
  alternates: {
    canonical: 'https://pkcevents.com/locations/kochi',
  },
};

export default function KochiLocationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'PKC Events Kochi',
    image: 'https://pkcevents.com/image/about.webp',
    '@id': 'https://pkcevents.com/locations/kochi#localbusiness',
    url: 'https://pkcevents.com/locations/kochi',
    telephone: '+91-81380-02333',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Opposite Lulu Mall, Edappally',
      addressLocality: 'Kochi',
      addressRegion: 'Kerala',
      postalCode: '682024',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.0270528,
      longitude: 76.3056461,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '21:00',
    }
  };

  return (
    <main className="container mx-auto px-4 py-8" style={{ paddingTop: '150px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Event Management Services in Kochi</h1>
      <div className="grid md:grid-cols-2 gap-8" style={{ marginTop: '40px' }}>
        <div>
          <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
            PKC Events brings world-class event management to Kochi. With its vibrant culture and beautiful venues, Kochi is perfect for destination weddings and large corporate events. Our dedicated team ensures flawless execution of your special day.
          </p>
          <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
            <Image
              src="/image/about.webp"
              alt="Premium wedding decoration and setup in Kochi by PKC Events"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="rounded-lg shadow-md mb-4"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Visit Our Kochi Office</h2>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15716.481515286576!2d76.3056461!3d10.0270528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6578a00000001%3A0x6a05315589139266!2sLulu%20International%20Shopping%20Mall!5e0!3m2!1sen!2sin!4v1625555555556!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
          <p>
            <strong>Address:</strong>{" "}
            <a 
              href="https://www.google.com/maps/place/Lulu+International+Shopping+Mall/@10.0270528,76.3056461,17z" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gold hover:underline"
            >
              Opposite Lulu Mall, Edappally, Kochi - 682024
            </a>
            <br />
            <strong>Phone:</strong>{" "}
            <a href="tel:+918138002333" className="hover:underline">
              +91 81380 02333
            </a>
            <br />
            <strong>Email:</strong>{" "}
            <a href="mailto:cok@pkcevents.com" className="hover:underline">
              cok@pkcevents.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
