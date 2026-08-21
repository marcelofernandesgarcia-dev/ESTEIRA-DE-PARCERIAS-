import React, { useState, useEffect } from 'react';
import { db, collection, query, onSnapshot, addDoc, serverTimestamp, updateDoc, doc } from '../firebase';
import { MessageSquare, Play, CheckCircle2, Clock, ThumbsUp } from 'lucide-react';

interface CentralEvolucaoProps {
  userEmail: string;
  onExecute?: (item: any) => void;
  language: 'pt' | 'en';
}

interface EvolucaoItem {
  id: string;
  autor: string;
  descricao: string;
  status: string;
  votos: number;
  createdAt: any;
}

const CentralEvolucao: React.FC<CentralEvolucaoProps> = ({ userEmail, onExecute, language }) => {
  const [ideias, setIdeias] = useState<EvolucaoItem[]>([]);
  const [novaIdeia, setNovaIdeia] = useState('');
  const authorizedEmails = [
    'marcelofernandesgarcia@gmail.com',
    'vitor.cesar@mgi.gov.br',
    'nayara.anjos@mgi.gov.br',
    'fernando.henrique@mgi.gov.br',
    'lili.araujo@mgi.gov.br'
  ];

  const canRegister = authorizedEmails.includes(userEmail);
  const canExecute = userEmail === 'marcelofernandesgarcia@gmail.com';

  useEffect(() => {
    const q = query(collection(db, 'evolucao_sgp'));
    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const docs: EvolucaoItem[] = [];
      snapshot.forEach((doc: any) => docs.push({ id: doc.id, ...doc.data() }));
      // Sort ideas by upvotes (votos) descending, then by date
      docs.sort((a, b) => (b.votos || 0) - (a.votos || 0));
      setIdeias(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleEnviar = async () => {
    if (!novaIdeia) return;
    await addDoc(collection(db, 'evolucao_sgp'), {
      autor: userEmail,
      descricao: novaIdeia,
      status: 'PENDING',
      votos: 0,
      createdAt: serverTimestamp()
    });
    setNovaIdeia('');
  };

  const handleAprovar = async (itemId: string) => {
    const docRef = doc(db, 'evolucao_sgp', itemId);
    await updateDoc(docRef, { status: 'APPROVED' });
  };

  const handleVotar = async (item: EvolucaoItem) => {
    const docRef = doc(db, 'evolucao_sgp', item.id);
    await updateDoc(docRef, { votos: (item.votos || 0) + 1 });
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -z-10"></div>
      
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-white">
          <MessageSquare className="text-blue-400 w-5 h-5" /> 
          {language === 'pt' ? 'Central de Evolução Real-Time' : 'Real-Time Evolution Center'}
        </h2>
        <p className="text-xs text-slate-400">
          {language === 'pt' 
            ? 'Sugira melhorias ou novas funcionalidades. Gestores autorizados e visitantes podem votar para priorizar itens de rollout.' 
            : 'Suggest improvements or new features. Authorized managers and visitors can vote to prioritize rollout items.'}
        </p>
      </div>
      
      <div className="flex gap-2">
        <input 
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-blue-500/50 rounded-xl p-3 text-xs text-slate-200 outline-none transition-all placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={
            !canRegister 
              ? (language === 'pt' ? 'Você não tem permissão para sugerir ideias.' : 'You do not have permission to suggest ideas.')
              : (language === 'pt' ? 'Descreva a necessidade negocial ou melhoria...' : 'Describe the business need or improvement...')
          }
          value={novaIdeia}
          onChange={(e) => setNovaIdeia(e.target.value)}
          disabled={!canRegister}
        />
        <button 
          onClick={handleEnviar} 
          disabled={!canRegister}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-md text-white ${
            canRegister 
              ? 'bg-blue-600 hover:bg-blue-500 active:scale-98 cursor-pointer' 
              : 'bg-slate-800/40 text-slate-500 border border-slate-850 cursor-not-allowed'
          }`}
        >
          {language === 'pt' ? 'Registrar Ideia' : 'Register Idea'}
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {ideias.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">
            {language === 'pt' ? 'Nenhuma sugestão registrada ainda.' : 'No suggestions registered yet.'}
          </p>
        ) : (
          ideias.map((item) => {
            const isApproved = item.status === 'APPROVED';
            return (
              <div key={item.id} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-slate-700/80 transition-all">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-100">{item.descricao}</p>
                  <span className="text-[10px] text-slate-500 block">
                    {language === 'pt' ? 'Enviado por: ' : 'Sent by: '}<span className="font-mono text-slate-400">{item.autor}</span>
                  </span>
                </div>
                
                <div className="flex items-center gap-2.5 self-end sm:self-auto flex-wrap">
                  {/* Interactive Votos/Upvote Button */}
                  <button
                    onClick={() => handleVotar(item)}
                    className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 active:scale-90 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-slate-200 border border-slate-700 transition-all cursor-pointer select-none"
                    title={language === 'pt' ? 'Votar nesta melhoria' : 'Vote for this improvement'}
                  >
                    <ThumbsUp size={11} className="text-blue-400" />
                    <span>{item.votos || 0}</span>
                  </button>

                  <span className={`text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded border ${
                    isApproved 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {item.status}
                  </span>

                  {/* Allow approval option for Marcelo if not yet approved */}
                  {canExecute && !isApproved && (
                    <button
                      onClick={() => handleAprovar(item.id)}
                      className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 active:scale-95 px-2.5 py-1.5 rounded-lg text-[9px] font-bold text-slate-200 border border-slate-700 transition-all cursor-pointer"
                      title={language === 'pt' ? 'Aprovar Ideia' : 'Approve Idea'}
                    >
                      {language === 'pt' ? 'Aprovar' : 'Approve'}
                    </button>
                  )}

                  {canExecute && (
                    <button 
                      disabled={!isApproved}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        isApproved 
                          ? 'bg-green-600 hover:bg-green-500 text-white active:scale-95 shadow-md border border-green-600' 
                          : 'bg-slate-800/40 text-slate-500 border border-slate-800/30 cursor-not-allowed'
                      }`}
                      onClick={() => onExecute && onExecute({
                        id: item.id,
                        namePt: item.descricao,
                        nameEn: item.descricao,
                        descPt: `Ideia de evolução aprovada e executada pela Central. Autor: ${item.autor}`,
                        descEn: `Evolution idea approved and executed from the Center. Author: ${item.autor}`,
                        status: item.status
                      })}
                    >
                      <Play size={10} className="fill-current" />
                      {language === 'pt' ? 'Executar' : 'Execute'}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CentralEvolucao;
