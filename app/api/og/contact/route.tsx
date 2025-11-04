import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1f2937 50%, #E7B109 100%)',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            backgroundColor: '#E7B109',
            borderRadius: '50%',
            marginBottom: 40,
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Κ
        </div>
        
        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          ΚΥΚΛΟΣ Φροντιστήριο
        </div>
        
        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          Επικοινωνία
        </div>
        
        {/* Contact Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            fontSize: 20,
            color: 'white',
          }}
        >
          <div>📞 +30 26810 26671</div>
          <div>📍 Βασιλέως Κωνσταντίνου 42, Άρτα</div>
          <div>🕒 Δευ-Παρ: 09:00-21:00, Σάβ: 10:00-15:00</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
