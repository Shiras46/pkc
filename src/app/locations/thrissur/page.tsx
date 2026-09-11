import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Event Management Services in Thrissur | PKC Events',
  description: 'Top-rated event management and catering company in Thrissur. We organize weddings, corporate events, and parties with exceptional quality.',
  alternates: {
    canonical: 'https://pkcevents.com/locations/thrissur',
  },
};

export default function ThrissurLocationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'PKC Events Thrissur',
    image: 'https://pkcevents.com/image/services/catering.webp',
    '@id': 'https://pkcevents.com/locations/thrissur#localbusiness',
    url: 'https://pkcevents.com/locations/thrissur',
    telephone: '+91-81380-02333',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Arammel Arcade, nr. Mannuthy - Madakkathara Road, Sree Lakshmi Nagar, Mannuthy',
      addressLocality: 'Thrissur',
      addressRegion: 'Kerala',
      postalCode: '680651',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.5298055,
      longitude: 76.2517505,
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
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '245'
    }
  };

  return (
    <main className="container mx-auto px-4 py-8" style={{ paddingTop: '150px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Event Management Services in Thrissur</h1>
      <div className="grid md:grid-cols-2 gap-8" style={{ marginTop: '40px' }}>
        <div>
          <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
            Welcome to PKC Events in Thrissur. As a leading event management company in the cultural capital of Kerala, we bring your visions to life. From grand traditional weddings to modern corporate events, our expert team ensures every detail is perfect.
          </p>
          <div style={{ position: 'relative', width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
            <Image
              src="/image/services/catering.webp"
              alt="Premium wedding catering food presentation in Thrissur by PKC Events"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="rounded-lg shadow-md mb-4"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Visit Our Thrissur Office</h2>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.271509378036!2d76.24956181480084!3d10.529810892495914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ef98babf5719%3A0x9e0358ad8193ac61!2sPride+Kitchen+Caterers+%26+Events!5e0!3m2!1sen!2sin!4v1720529805500!5m2!1sen!2sin"
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
              href="https://maps.app.goo.gl/a39cG6zMdG82upn96" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gold hover:underline"
            >
              Arammel Arcade, nr. Mannuthy - Madakkathara Road, Sree Lakshmi Nagar, Mannuthy, Thrissur, Kerala 680651
            </a>
            <br />
            <strong>Phone:</strong>{" "}
            <a href="tel:+918138002333" className="hover:underline">
              +91 81380 02333
            </a>
            <br />
            <strong>Email:</strong>{" "}
            <a href="mailto:pridekitchencaterers@gmail.com" className="hover:underline">
              pridekitchencaterers@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
