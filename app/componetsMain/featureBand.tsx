"use client";
import { Scale, ArrowRight, Trophy } from "lucide-react";

export default function FeatureBand() {
  const items = [
    {
      id: 1,
      title: "Analyzing The Case",
      desc: "We assess your needs to match you with the right expertise.",
      Icon: Scale,
    },
    {
      id: 2,
      title: "Taking Steps Forward",
      desc: "Clear next actions and guidance from verified professionals.",
      Icon: ArrowRight,
    },
    {
      id: 3,
      title: "Court Of Law Success",
      desc: "Strong representation and documentation throughout.",
      Icon: Trophy,
    },
  ];
  return (
    <>
      <div className="container section">
        <div className="text-center mb-16" data-sr>
          <span className="px-4 py-1 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full mb-4">
            Our Approach
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-4">
            High Quality Legal Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed mt-4">
            Guidance from verified professionals at every stage—analysis, next steps, and representation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map(({ id, title, desc, Icon }) => (
            <div key={id} className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300" data-sr>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* removed embedded cards grid */}
    </>
  );
}
