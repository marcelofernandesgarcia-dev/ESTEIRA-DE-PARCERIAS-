import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const BRAZIL_STATES_POLYGONS = [
  { uf: 'RR', name: 'Roraima', capital: 'Boa Vista', region: 'Norte', pilot: true, points: [[170,25], [210,25], [195,65], [160,70]] },
  { uf: 'AP', name: 'Amapá', capital: 'Macapá', region: 'Norte', pilot: true, points: [[270,40], [300,55], [290,75], [260,65]] },
  { uf: 'AM', name: 'Amazonas', capital: 'Manaus', region: 'Norte', pilot: false, points: [[60,75], [170,75], [195,120], [150,150], [90,140], [60,115]] },
  { uf: 'PA', name: 'Pará', capital: 'Belém', region: 'Norte', pilot: false, points: [[195,65], [290,75], [300,125], [250,140], [230,135], [195,120]] },
  { uf: 'AC', name: 'Acre', capital: 'Rio Branco', region: 'Norte', pilot: true, points: [[30,145], [90,140], [80,165], [40,160]] },
  { uf: 'RO', name: 'Rondônia', capital: 'Porto Velho', region: 'Norte', pilot: true, points: [[90,140], [150,150], [160,190], [110,190]] },
  { uf: 'TO', name: 'Tocantins', capital: 'Palmas', region: 'Norte', pilot: true, points: [[260,125], [290,125], [280,180], [250,180]] },
  
  { uf: 'MA', name: 'Maranhão', capital: 'São Luís', region: 'Nordeste', pilot: false, points: [[300,85], [335,95], [325,135], [300,125]] },
  { uf: 'PI', name: 'Piauí', capital: 'Teresina', region: 'Nordeste', pilot: false, points: [[335,95], [365,100], [355,150], [325,135]] },
  { uf: 'CE', name: 'Ceará', capital: 'Fortaleza', region: 'Nordeste', pilot: false, points: [[365,85], [400,90], [390,120], [370,115]] },
  { uf: 'RN', name: 'Rio Grande do Norte', capital: 'Natal', region: 'Nordeste', pilot: true, points: [[400,90], [435,95], [430,110], [405,105]] },
  { uf: 'PB', name: 'Paraíba', capital: 'João Pessoa', region: 'Nordeste', pilot: false, points: [[405,105], [435,110], [430,125], [400,120]] },
  { uf: 'PE', name: 'Pernambuco', capital: 'Recife', region: 'Nordeste', pilot: false, points: [[355,120], [430,125], [425,140], [350,135]] },
  { uf: 'AL', name: 'Alagoas', capital: 'Maceió', region: 'Nordeste', pilot: true, points: [[410,140], [425,140], [415,155], [405,150]] },
  { uf: 'SE', name: 'Sergipe', capital: 'Aracaju', region: 'Nordeste', pilot: false, points: [[400,150], [412,152], [405,165], [395,160]] },
  { uf: 'BA', name: 'Bahia', capital: 'Salvador', region: 'Nordeste', pilot: true, points: [[310,140], [395,140], [395,160], [380,190], [340,195], [320,165]] },

  { uf: 'MT', name: 'Mato Grosso', capital: 'Cuiabá', region: 'Centro-Oeste', pilot: false, points: [[160,150], [250,140], [240,205], [175,215]] },
  { uf: 'GO', name: 'Goiás', capital: 'Goiânia', region: 'Centro-Oeste', pilot: false, points: [[240,190], [280,190], [270,230], [230,220]] },
  { uf: 'DF', name: 'Distrito Federal', capital: 'Brasília', region: 'Centro-Oeste', pilot: false, points: [[255,200], [268,200], [268,212], [255,212]] },
  { uf: 'MS', name: 'Mato Grosso do Sul', capital: 'Campo Grande', region: 'Centro-Oeste', pilot: false, points: [[170,215], [225,215], [215,255], [160,245]] },

  { uf: 'MG', name: 'Minas Gerais', capital: 'Belo Horizonte', region: 'Sudeste', pilot: false, points: [[275,200], [330,195], [345,240], [290,250], [260,230]] },
  { uf: 'ES', name: 'Espírito Santo', capital: 'Vitória', region: 'Sudeste', pilot: false, points: [[345,225], [360,230], [350,250], [340,245]] },
  { uf: 'RJ', name: 'Rio de Janeiro', capital: 'Rio de Janeiro', region: 'Sudeste', pilot: false, points: [[315,250], [350,245], [340,260], [310,255]] },
  { uf: 'SP', name: 'São Paulo', capital: 'São Paulo', region: 'Sudeste', pilot: false, points: [[215,250], [285,250], [270,280], [205,270]] },

  { uf: 'PR', name: 'Paraná', capital: 'Curitiba', region: 'Sul', pilot: false, points: [[195,270], [250,275], [240,300], [185,290]] },
  { uf: 'SC', name: 'Santa Catarina', capital: 'Florianópolis', region: 'Sul', pilot: false, points: [[205,295], [250,300], [240,315], [195,310]] },
  { uf: 'RS', name: 'Rio Grande do Sul', capital: 'Porto Alegre', region: 'Sul', pilot: false, points: [[180,310], [240,315], [220,355], [165,345]] }
];

interface MapaRolloutProps {
  language: 'pt' | 'en';
  mapFilter: 'all' | 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul' | 'pilot';
  entityType: 'state' | 'capital' | 'municipality';
  selectedUf: string;
  setEntityType: (type: 'state' | 'capital' | 'municipality') => void;
  setSelectedUf: (uf: string) => void;
  setPopulation: (pop: number) => void;
  setHasAct: (act: boolean) => void;
  setValidatedViaApi: (val: boolean) => void;
  setSearchFeedback: (val: any) => void;
}

const MapaRollout: React.FC<MapaRolloutProps> = ({
  language,
  mapFilter,
  entityType,
  selectedUf,
  setEntityType,
  setSelectedUf,
  setPopulation,
  setHasAct,
  setValidatedViaApi,
  setSearchFeedback
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [loadingMap, setLoadingMap] = useState<boolean>(true);
  const [hoveredUf, setHoveredUf] = useState<string | null>(null);

  useEffect(() => {
    fetch('/brazil-states.json')
      .then(res => res.json())
      .then(data => {
        setGeoData(data);
        setLoadingMap(false);
      })
      .catch(err => {
        console.error("Failed to load map GeoJSON:", err);
        setLoadingMap(false);
      });
  }, []);

  useEffect(() => {
    if (!geoData) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    let mouseX = -999;
    let mouseY = -999;

    const minLng = -73.99045;
    const maxLng = -34.79314;
    const minLat = -33.75117;
    const maxLat = 5.27184;

    const scaleX = rect.width / (maxLng - minLng);
    const scaleY = rect.height / (maxLat - minLat);
    const scale = Math.min(scaleX, scaleY) * 0.95;

    const offsetX = (rect.width - (maxLng - minLng) * scale) / 2;
    const offsetY = (rect.height - (maxLat - minLat) * scale) / 2;

    const project = (lng: number, lat: number) => {
      const x = offsetX + (lng - minLng) * scale;
      const y = rect.height - (offsetY + (lat - minLat) * scale);
      return [x, y];
    };

    const statePaths = geoData.features.map((feature: any) => {
      const sigla = feature.properties.sigla;
      const name = feature.properties.name;

      const info = BRAZIL_STATES_POLYGONS.find((n: any) => n.uf === sigla) || {
        region: 'Outro',
        pilot: false,
        capital: ''
      };

      const path = new Path2D();
      const geom = feature.geometry;

      const addRing = (ring: any) => {
        const [startLng, startLat] = ring[0];
        const [startX, startY] = project(startLng, startLat);
        path.moveTo(startX, startY);
        for (let i = 1; i < ring.length; i++) {
          const [lng, lat] = ring[i];
          const [x, y] = project(lng, lat);
          path.lineTo(x, y);
        }
        path.closePath();
      };

      if (geom.type === 'Polygon') {
        geom.coordinates.forEach(addRing);
      } else if (geom.type === 'MultiPolygon') {
        geom.coordinates.forEach((poly: any) => poly.forEach(addRing));
      }

      let sMinX = 9999, sMaxX = -9999, sMinY = 9999, sMaxY = -9999;
      const calcCentroid = (coords: any) => {
        if (Array.isArray(coords[0])) {
          coords.forEach(calcCentroid);
        } else {
          const [x, y] = project(coords[0], coords[1]);
          if (x < sMinX) sMinX = x;
          if (x > sMaxX) sMaxX = x;
          if (y < sMinY) sMinY = y;
          if (y > sMaxY) sMaxY = y;
        }
      };
      calcCentroid(geom.coordinates);

      let labelX = sMinX + (sMaxX - sMinX) / 2;
      let labelY = sMinY + (sMaxY - sMinY) / 2;

      if (sigla === 'RN') { labelX += 8; labelY -= 2; }
      if (sigla === 'PB') { labelX += 8; labelY += 2; }
      if (sigla === 'PE') { labelX += 12; labelY += 4; }
      if (sigla === 'AL') { labelX += 6; labelY += 4; }
      if (sigla === 'SE') { labelX += 5; labelY += 4; }
      if (sigla === 'DF') { labelX += 1; labelY += 1; }

      return {
        uf: sigla,
        name,
        capital: info.capital,
        region: info.region,
        pilot: info.pilot,
        path,
        labelX,
        labelY
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    };

    const handleMouseLeave = () => {
      mouseX = -999;
      mouseY = -999;
      setHoveredUf(null);
    };

    const handleCanvasClick = () => {
      if (!ctx) return;
      for (const sp of statePaths) {
        if (ctx.isPointInPath(sp.path, mouseX, mouseY)) {
          const matchesFilter = 
            mapFilter === 'all' || 
            (mapFilter === 'pilot' && sp.pilot) || 
            (mapFilter === sp.region);
          if (!matchesFilter) return;

          setEntityType('state');
          setSelectedUf(sp.uf);
          
          // Test auto-fill values for simulator when clicked
          const pilotState = [
            { uf: 'AC', pop: 900000, act: true },
            { uf: 'AL', pop: 3300000, act: true },
            { uf: 'AP', pop: 850000, act: true },
            { uf: 'BA', pop: 14000000, act: true },
            { uf: 'RN', pop: 3500000, act: true },
            { uf: 'RO', pop: 1800000, act: true },
            { uf: 'RR', pop: 650000, act: true },
            { uf: 'TO', pop: 1600000, act: true }
          ].find(p => p.uf === sp.uf);

          if (pilotState) {
            setPopulation(pilotState.pop);
            setHasAct(pilotState.act);
            setValidatedViaApi(true);
            setSearchFeedback({
              success: true,
              message: language === 'pt' 
                ? `Sucesso: Estado do ${sp.name} (${sp.uf}) carregado com dados do Piloto!` 
                : `Success: State of ${sp.name} (${sp.uf}) loaded with Pilot data!`
            });
          }

          document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
          break;
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleCanvasClick);

    const render = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      let activeHover: string | null = null;

      statePaths.forEach((sp: any) => {
        const isHovered = ctx.isPointInPath(sp.path, mouseX, mouseY);
        const isSelected = entityType === 'state' && selectedUf === sp.uf;
        const matchesFilter = 
          mapFilter === 'all' || 
          (mapFilter === 'pilot' && sp.pilot) || 
          (mapFilter === sp.region);

        if (isHovered && matchesFilter) {
          activeHover = sp.uf;
        }

        let baseColor = 'rgba(30, 41, 59, 0.4)';
        let strokeColor = 'rgba(255, 255, 255, 0.15)';

        if (sp.region === 'Norte') {
          baseColor = isSelected ? '#0f764a' : isHovered && matchesFilter ? '#10965e' : '#1e8f5c';
          strokeColor = isSelected ? '#ffffff' : '#14532d';
        } else if (sp.region === 'Nordeste') {
          baseColor = isSelected ? '#b91c1c' : isHovered && matchesFilter ? '#dc2626' : '#e11d48';
          strokeColor = isSelected ? '#ffffff' : '#7f1d1d';
        } else if (sp.region === 'Centro-Oeste') {
          baseColor = isSelected ? '#c2410c' : isHovered && matchesFilter ? '#ea580c' : '#f97316';
          strokeColor = isSelected ? '#ffffff' : '#7c2d12';
        } else if (sp.region === 'Sudeste') {
          baseColor = isSelected ? '#a16207' : isHovered && matchesFilter ? '#d97706' : '#eab308';
          strokeColor = isSelected ? '#ffffff' : '#713f12';
        } else if (sp.region === 'Sul') {
          baseColor = isSelected ? '#4f46e5' : isHovered && matchesFilter ? '#6366f1' : '#818cf8';
          strokeColor = isSelected ? '#ffffff' : '#312e81';
        }

        if (!matchesFilter) {
          baseColor = 'rgba(15, 23, 42, 0.15)';
          strokeColor = 'rgba(255, 255, 255, 0.05)';
        }

        ctx.fillStyle = baseColor;
        ctx.fill(sp.path);
        
        ctx.lineWidth = isSelected ? 2.5 : isHovered && matchesFilter ? 1.5 : 1.0;
        ctx.strokeStyle = strokeColor;
        ctx.stroke(sp.path);

        if (isSelected) {
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.stroke(sp.path);
          ctx.shadowBlur = 0;
        } else if (sp.pilot && matchesFilter) {
          ctx.shadowColor = '#22c55e';
          ctx.shadowBlur = isHovered ? 8 : 2;
          ctx.stroke(sp.path);
          ctx.shadowBlur = 0;
        }
      });

      statePaths.forEach((sp: any) => {
        const matchesFilter = 
          mapFilter === 'all' || 
          (mapFilter === 'pilot' && sp.pilot) || 
          (mapFilter === sp.region);
        const isSelected = entityType === 'state' && selectedUf === sp.uf;

        let textFill = sp.region === 'Sudeste' && matchesFilter ? '#0f172a' : '#ffffff';
        if (!matchesFilter) textFill = '#475569';

        ctx.fillStyle = textFill;
        ctx.font = isSelected ? 'black 10px Inter, sans-serif' : 'bold 8.5px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(sp.uf, sp.labelX, sp.labelY + 3);

        if (sp.pilot && matchesFilter) {
          ctx.beginPath();
          ctx.arc(sp.labelX + 8, sp.labelY - 5, 2, 0, 2 * Math.PI);
          ctx.fillStyle = '#22c55e';
          ctx.fill();
        }
      });

      if (activeHover) {
        setHoveredUf(activeHover);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [geoData, entityType, selectedUf, mapFilter]);

  if (loadingMap) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 w-full h-[400px] bg-slate-950/20 rounded-2xl border border-slate-900">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-[#c5a059] rounded-full animate-spin" />
        <span className="text-xs text-slate-400 font-mono">
          {language === 'pt' ? 'Carregando mapa geográfico (3.3MB)...' : 'Loading geographical map (3.3MB)...'}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[460px] flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-pointer bg-slate-950/10 rounded-2xl border border-slate-900" 
      />
      
      {hoveredUf && (() => {
        const target = BRAZIL_STATES_POLYGONS.find(n => n.uf === hoveredUf);
        if (!target) return null;
        return (
          <div className="absolute bottom-4 left-4 bg-slate-950/95 border border-slate-800 text-white rounded-xl p-3 shadow-2xl z-20 pointer-events-none max-w-xs font-sans text-xs space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#c5a059]">{target.name} ({target.uf})</span>
              {target.pilot && (
                <span className="bg-green-500/10 border border-green-500/30 text-green-400 font-mono text-[8px] px-1 py-0.5 rounded font-bold uppercase tracking-wider">
                  {language === 'pt' ? 'PILOTO' : 'PILOT'}
                </span>
              )}
            </div>
            <div className="text-slate-400 text-[10px]">
              <div>{language === 'pt' ? 'Capital: ' : 'Capital: '}<span className="text-slate-300 font-medium">{target.capital}</span></div>
              <div>{language === 'pt' ? 'Região: ' : 'Region: '}<span className="text-slate-300 font-medium">{target.region === 'Norte' ? (language === 'pt' ? 'Norte' : 'North') : target.region === 'Nordeste' ? (language === 'pt' ? 'Nordeste' : 'Northeast') : target.region === 'Centro-Oeste' ? (language === 'pt' ? 'Centro-Oeste' : 'Central-West') : target.region === 'Sudeste' ? (language === 'pt' ? 'Sudeste' : 'Southeast') : (language === 'pt' ? 'Sul' : 'South')}</span></div>
              <div className="mt-1 text-amber-500 font-mono font-semibold">
                {target.pilot 
                  ? (language === 'pt' ? '• Acordo de Cooperação Ativo (Jul/26)' : '• Active Cooperation Agreement (Jul/26)') 
                  : (language === 'pt' ? '• Rollout Geral Planejado (Out/26)' : '• Planned General Rollout (Oct/26)')}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default MapaRollout;
