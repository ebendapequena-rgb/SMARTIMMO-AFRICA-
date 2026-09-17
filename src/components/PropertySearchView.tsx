import React, { useState, useMemo } from "react";
import { City, District, PropertyItem, SearchExtraction } from "../types";
import {
  MOCK_PROPERTIES,
  DOUALA_DISTRICTS,
  YAOUNDE_DISTRICTS,
} from "../data/mockData";
import {
  Search,
  MapPin,
  Eye,
  Home,
  CheckCircle2,
  Sparkles,
  Phone,
  Calendar,
  X,
  ChevronRight,
  Maximize2,
  ShieldCheck,
  Building,
  SlidersHorizontal,
} from "lucide-react";

interface PropertySearchViewProps {
  currentCity: City;
  initialSearchContext?: SearchExtraction | null;
  openAiAssistant: () => void;
}

export const PropertySearchView: React.FC<PropertySearchViewProps> = ({
  currentCity,
  initialSearchContext,
  openAiAssistant,
}) => {
  // Filters
  const [selectedCity, setSelectedCity] = useState<City>(
    initialSearchContext?.city || currentCity
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    initialSearchContext?.district || "all"
  );
  const [selectedType, setSelectedType] = useState<string>(
    initialSearchContext?.propertyType || "all"
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    initialSearchContext?.budget ? initialSearchContext.budget * 1.5 : 200000000
  );
  const [minBedrooms, setMinBedrooms] = useState<number>(
    initialSearchContext?.bedrooms || 0
  );
  const [onlyVirtualTour, setOnlyVirtualTour] = useState<boolean>(false);

  // Virtual Tour Modal State
  const [activeTourProperty, setActiveTourProperty] = useState<PropertyItem | null>(null);
  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);
  const [selectedDetailModalProperty, setSelectedDetailModalProperty] = useState<PropertyItem | null>(null);

  const districtsList = selectedCity === "Douala" ? DOUALA_DISTRICTS : YAOUNDE_DISTRICTS;

  // Filter properties
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((p) => {
      if (selectedCity && p.city !== selectedCity) return false;
      if (selectedDistrict !== "all" && p.district !== selectedDistrict) return false;
      if (selectedType !== "all" && p.type !== selectedType) return false;
      if (p.price > maxPrice) return false;
      if (minBedrooms > 0 && (p.bedrooms || 0) < minBedrooms) return false;
      if (onlyVirtualTour && !p.virtualTourAvailable) return false;
      return true;
    });
  }, [selectedCity, selectedDistrict, selectedType, maxPrice, minBedrooms, onlyVirtualTour]);

  const openVirtualTour = (property: PropertyItem) => {
    setActiveTourProperty(property);
    setActiveRoomIndex(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Header */}
      <div className="bg-[#111723] rounded-2xl border border-[#212d41] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            <Eye className="w-4 h-4" />
            <span>Domaine 5 • Recherche de Biens Sécurisés & Visites Virtuelles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk'] mt-1">
            Biens Disponibles & Visite Virtuelle 360°
          </h1>
          <p className="text-sm text-[#9aa4b8] mt-1">
            Explorez des terrains titrés et résidences vérifiés à Douala et Yaoundé. Visitez chaque pièce de chez vous avant tout déplacement.
          </p>
        </div>

        <button
          onClick={openAiAssistant}
          className="bg-[#1b2536] hover:bg-[#c5a059] text-white hover:text-black font-bold px-4 py-2.5 rounded-xl border border-[#2e3e57] hover:border-[#c5a059] transition-all flex items-center gap-2 text-sm shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#e5c378]" />
          <span>Trouver un bien avec l'IA</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#111722] rounded-2xl border border-[#202c3f] p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#212d41] pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <SlidersHorizontal className="w-4 h-4 text-[#c5a059]" />
            <span>Filtres de recherche</span>
          </div>
          <span className="text-xs text-gray-400">
            {filteredProperties.length} bien(s) correspondant(s)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
          {/* Ville */}
          <div>
            <label className="text-gray-300 font-semibold block mb-1">Ville</label>
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value as City);
                setSelectedDistrict("all");
              }}
              className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#c5a059]"
            >
              <option value="Douala">Douala</option>
              <option value="Yaoundé">Yaoundé</option>
            </select>
          </div>

          {/* Quartier */}
          <div>
            <label className="text-gray-300 font-semibold block mb-1">Quartier</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#c5a059]"
            >
              <option value="all">Tous les quartiers</option>
              {districtsList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Type de bien */}
          <div>
            <label className="text-gray-300 font-semibold block mb-1">Type de bien</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#c5a059]"
            >
              <option value="all">Tous types</option>
              <option value="terrain">Terrain à bâtir</option>
              <option value="maison">Maison / Duplex</option>
              <option value="appartement">Appartement</option>
              <option value="bureau">Bureau / Commerce</option>
            </select>
          </div>

          {/* Budget Max */}
          <div>
            <label className="text-gray-300 font-semibold block mb-1">
              Budget max : {new Intl.NumberFormat("fr-FR").format(maxPrice)} F
            </label>
            <input
              type="range"
              min={10000000}
              max={250000000}
              step={5000000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-[#202c3f] rounded-lg appearance-none cursor-pointer accent-[#c5a059] mt-2"
            />
          </div>

          {/* Chambres */}
          <div>
            <label className="text-gray-300 font-semibold block mb-1">Chambres min.</label>
            <select
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(Number(e.target.value))}
              className="w-full bg-[#161f2e] border border-[#26354b] rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#c5a059]"
            >
              <option value={0}>Peu importe</option>
              <option value={2}>2 chambres +</option>
              <option value={3}>3 chambres +</option>
              <option value={4}>4 chambres +</option>
            </select>
          </div>

          {/* Checkbox Visite 360 */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-gray-200 cursor-pointer bg-[#161f2e] p-2.5 rounded-xl border border-[#26354b] w-full h-[42px]">
              <input
                type="checkbox"
                checked={onlyVirtualTour}
                onChange={(e) => setOnlyVirtualTour(e.target.checked)}
                className="rounded text-[#c5a059] focus:ring-0"
              />
              <span className="truncate">Visite 360° uniquement</span>
            </label>
          </div>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="group bg-[#111722] rounded-2xl border border-[#202c3f] hover:border-[#c5a059]/60 overflow-hidden shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image & Badges */}
            <div className="relative h-56 w-full overflow-hidden bg-[#182131]">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111723] via-transparent to-black/30"></div>

              {/* Verified Badge */}
              {property.isVerified && (
                <div className="absolute top-3 left-3 bg-[#10b981]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#34d399]/40 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{property.legalStatus}</span>
                </div>
              )}

              {/* Virtual Tour Badge */}
              {property.virtualTourAvailable && (
                <div className="absolute top-3 right-3 bg-[#c5a059] text-black text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visite 360°</span>
                </div>
              )}

              {/* Price Pill */}
              <div className="absolute bottom-3 left-3 bg-[#0c121b]/90 backdrop-blur-md text-[#e5c378] font-extrabold text-base px-3 py-1.5 rounded-xl border border-[#2a384e]">
                {new Intl.NumberFormat("fr-FR").format(property.price)} FCFA
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>
                    {property.district}, {property.city}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#e5c378] transition-colors font-['Space_Grotesk'] leading-snug">
                  {property.title}
                </h3>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {property.description}
                </p>

                {/* Key Specs */}
                <div className="flex items-center gap-3 pt-2 text-xs text-gray-300">
                  <span className="bg-[#172130] px-2.5 py-1 rounded-lg border border-[#27374e]">
                    📐 {property.surface} m²
                  </span>
                  {property.bedrooms && (
                    <span className="bg-[#172130] px-2.5 py-1 rounded-lg border border-[#27374e]">
                      🛏️ {property.bedrooms} ch.
                    </span>
                  )}
                  {property.bathrooms && (
                    <span className="bg-[#172130] px-2.5 py-1 rounded-lg border border-[#27374e]">
                      🚿 {property.bathrooms} SDB
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e293b]">
                <button
                  onClick={() => setSelectedDetailModalProperty(property)}
                  className="w-full bg-[#182333] hover:bg-[#202c3f] text-gray-200 hover:text-white font-bold py-2.5 px-3 rounded-xl border border-[#27374e] transition-all text-xs flex items-center justify-center gap-1.5"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Voir le bien</span>
                </button>

                {property.virtualTourAvailable ? (
                  <button
                    onClick={() => openVirtualTour(property)}
                    className="w-full bg-[#c5a059] hover:bg-[#d8b46b] text-black font-extrabold py-2.5 px-3 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#c5a059]/10"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visite 360°</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedDetailModalProperty(property)}
                    className="w-full bg-[#151c27] text-gray-500 font-medium py-2.5 px-3 rounded-xl border border-[#202b3c] text-xs flex items-center justify-center gap-1"
                  >
                    <span>Photos HD</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Virtual Tour Modal (Pièce par pièce) */}
      {activeTourProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#0e141f] border border-[#26354c] rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Tour Header */}
            <div className="bg-[#131b28] px-5 py-3.5 border-b border-[#24334a] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping"></span>
                  <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                    Visite Virtuelle 360° : {activeTourProperty.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-400">
                  {activeTourProperty.district}, {activeTourProperty.city} • Déplacez-vous de pièce en pièce
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTourProperty(null)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-[#1f2b3e] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Stage: Current Room View */}
            <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
              {activeTourProperty.virtualRooms && activeTourProperty.virtualRooms[activeRoomIndex] ? (
                <>
                  <img
                    src={activeTourProperty.virtualRooms[activeRoomIndex].imageUrl}
                    alt={activeTourProperty.virtualRooms[activeRoomIndex].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                  {/* Room Name Badge */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white">
                    <span className="text-xs text-[#c5a059] uppercase font-bold block">
                      Pièce {activeRoomIndex + 1} sur {activeTourProperty.virtualRooms.length}
                    </span>
                    <span className="text-lg font-extrabold">
                      {activeTourProperty.virtualRooms[activeRoomIndex].name}
                    </span>
                  </div>

                  {/* Interactive Hotspot Feature Highlight */}
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0d131d]/90 backdrop-blur-md p-4 rounded-xl border border-[#2b3a50]">
                    <div>
                      <span className="text-xs font-bold text-[#e5c378] block">
                        Caractéristiques de cette pièce :
                      </span>
                      <p className="text-sm text-gray-200">
                        {activeTourProperty.virtualRooms[activeRoomIndex].description}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        alert(
                          `Demande de rendez-vous enregistrée pour la visite physique de ${activeTourProperty.title}. Un conseiller va vous contacter au Cameroun.`
                        )
                      }
                      className="bg-[#c5a059] hover:bg-[#d8b46b] text-black font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shrink-0"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Réserver une visite physique</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-gray-400">Aucune pièce disponible</div>
              )}
            </div>

            {/* Room Selector Strip */}
            <div className="bg-[#121926] p-4 border-t border-[#24334a]">
              <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                Plan de circulation • Choisissez la pièce à explorer :
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activeTourProperty.virtualRooms?.map((room, idx) => (
                  <button
                    key={room.id}
                    onClick={() => setActiveRoomIndex(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      activeRoomIndex === idx
                        ? "bg-[#c5a059] text-black border-[#c5a059] font-bold shadow-md"
                        : "bg-[#161f2e] text-gray-300 border-[#25354c] hover:bg-[#1d273a]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-black/40">
                      <img src={room.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs truncate">{room.name}</div>
                      <div className={`text-[10px] ${activeRoomIndex === idx ? "text-gray-900" : "text-gray-400"}`}>
                        Explorer
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Property Details Modal */}
      {selectedDetailModalProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0e141f] border border-[#26354c] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#212e42] pb-4">
              <div>
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                  {selectedDetailModalProperty.type} • {selectedDetailModalProperty.city}
                </span>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mt-0.5">
                  {selectedDetailModalProperty.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDetailModalProperty(null)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <img
              src={selectedDetailModalProperty.imageUrl}
              alt={selectedDetailModalProperty.title}
              className="w-full h-64 object-cover rounded-xl"
            />

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#151e2b] p-3 rounded-xl border border-[#243349]">
                <span className="text-xs text-gray-400 block">Prix</span>
                <span className="text-sm font-bold text-[#e5c378]">
                  {new Intl.NumberFormat("fr-FR").format(selectedDetailModalProperty.price)} F
                </span>
              </div>
              <div className="bg-[#151e2b] p-3 rounded-xl border border-[#243349]">
                <span className="text-xs text-gray-400 block">Superficie</span>
                <span className="text-sm font-bold text-white">
                  {selectedDetailModalProperty.surface} m²
                </span>
              </div>
              <div className="bg-[#151e2b] p-3 rounded-xl border border-[#243349]">
                <span className="text-xs text-gray-400 block">Statut juridique</span>
                <span className="text-sm font-bold text-[#34d399]">
                  {selectedDetailModalProperty.legalStatus}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {selectedDetailModalProperty.description}
            </p>

            <div className="flex items-center gap-3 pt-3 border-t border-[#212e42]">
              {selectedDetailModalProperty.virtualTourAvailable && (
                <button
                  onClick={() => {
                    const p = selectedDetailModalProperty;
                    setSelectedDetailModalProperty(null);
                    openVirtualTour(p);
                  }}
                  className="flex-1 bg-[#c5a059] hover:bg-[#d8b46b] text-black font-extrabold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Lancer la Visite Virtuelle 360°</span>
                </button>
              )}
              <button
                onClick={() =>
                  alert(
                    `Contact pris avec l'agent officiel pour ${selectedDetailModalProperty.title}. Vous serez rappelé sous 1 heure.`
                  )
                }
                className="flex-1 bg-[#192333] hover:bg-[#233147] text-white font-bold py-3 rounded-xl border border-[#2b3b54] text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#e5c378]" />
                <span>Contacter l'agent au Cameroun</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
