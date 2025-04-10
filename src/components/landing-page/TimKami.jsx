import React, { useEffect, useState } from 'react';
import Vito from '../../assets/Vito.jpg';
import Jenni from '../../assets/Jenni.jpg';
import Dortea from '../../assets/Dortea.jpg';

function TimKami() {
  const [isVisible, setIsVisible] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Vicky Kaseger',
      image: Vito,
      position: 'left'
    },
    {
      id: 2,
      name: 'Jennifer Laluyan',
      image: Jenni,
      position: 'center'
    },
    {
      id: 3,
      name: 'Dortea Tadete',
      image: Dortea,
      position: 'right'
    }
  ];

  useEffect(() => {
    // Deteksi scroll untuk animasi saat section muncul di viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.querySelector('.team-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section className="py-16 team-section" id='tim-kami'>
      <div className="container mx-auto px-4">
        <div className="mb-28 text-center relative">
          <h2 className="text-4xl font-bold mb-2 ">Tim Kami</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`flex flex-col items-center ${member.position === 'center' ? 'md:-mt-16' : ''
                }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.6s ease-out ${index * 0.2}s`
              }}
            >
              <div className="relative w-full max-w-xs mx-auto mb-4">
                <div className="aspect-square overflow-hidden relative">
                  {/* Garis biru di atas setengah dari lebar gambar */}
                  <div
                    className="absolute top-0 left-1/4 right-1/4 h-2 bg-blue-500 z-10"
                    style={{
                      transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                      transition: `transform 0.8s ease-out ${0.3 + index * 0.2}s`,
                      transformOrigin: 'center'
                    }}
                  ></div>

                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={{
                      transform: isVisible ? 'scale(1)' : 'scale(1.1)',
                      transition: `transform 1s ease-out ${0.2 + index * 0.2}s`
                    }}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/400";
                    }}
                  />

                  {/* Garis biru di bawah setengah dari lebar gambar */}
                  <div
                    className="absolute bottom-0 left-1/4 right-1/4 h-2 bg-blue-500 z-10"
                    style={{
                      transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                      transition: `transform 0.8s ease-out ${0.3 + index * 0.2}s`,
                      transformOrigin: 'center'
                    }}
                  ></div>
                </div>
              </div>

              <h3
                className="text-2xl font-semibold text-center mb-1"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${0.4 + index * 0.2}s`
                }}
              >
                {member.name}
              </h3>

              <p
                className="text-gray-600 text-center"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease-out ${0.5 + index * 0.2}s`
                }}
              >
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TimKami;