import ReactMarkdown from 'react-markdown';
import CodeWorkspace from './CodeWorkspace';

const RouteDetail = ({ route, viewMode, setViewMode, onBack, contextoEvaluacion, onSendToAI, onOpenChat }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'BEGINNER': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'INTERMEDIATE': return 'bg-sky-500/10 text-sky-500 border-sky-500/20';
      case 'ADVANCED': return 'bg-violet-500/10 text-violet-500 border-violet-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'BEGINNER': return 'Principiante';
      case 'INTERMEDIATE': return 'Intermedio';
      case 'ADVANCED': return 'Avanzado';
      default: return difficulty;
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'PDF': return '📄';
      case 'VIDEO': return '▶️';
      case 'LINK': return '🔗';
      case 'IMAGE': return '🖼️';
      default: return '📁';
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 font-semibold transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Volver al catálogo
      </button>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
        <div className="flex flex-wrap gap-3 mb-6">
          <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(route.difficulty)}`}>
            {getDifficultyText(route.difficulty)}
          </span>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700">
            ⏱️ {route.estimatedTime} Minutos
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight mb-4">{route.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 max-w-3xl">
          {route.description}
        </p>

        <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-px">
          <button
            onClick={() => setViewMode('teoria')}
            className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors ${viewMode === 'teoria' ? 'border-violet-600 text-violet-600 dark:text-violet-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Material de Estudio
          </button>
          <button
            onClick={() => setViewMode('practica')}
            className={`pb-4 px-2 text-sm font-bold border-b-2 transition-colors ${viewMode === 'practica' ? 'border-violet-600 text-violet-600 dark:text-violet-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Entorno de Práctica
          </button>
        </div>

        {viewMode === 'teoria' ? (
          <>
            {(!route.resources || route.resources.length === 0) ? (
              <p className="text-slate-500 dark:text-slate-400 mb-10">Esta ruta aún no tiene recursos asignados.</p>
            ) : (
              <div className="space-y-4 mb-10">
                {route.resources.map((item, index) => {
                  const res = item.resource || item;
                  return (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 transition-colors gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                          {getResourceIcon(res.type)}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-white">{res.title}</h4>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{res.type}</span>
                        </div>
                      </div>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center sm:text-left bg-white dark:bg-slate-700 hover:bg-violet-50 dark:hover:bg-violet-500/20 text-violet-600 dark:text-violet-400 border border-slate-200 dark:border-slate-600 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
                      >
                        Abrir Recurso
                      </a>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-1">¿Terminaste de estudiar?</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">Pasa al entorno de práctica o abre el asistente de IA para poner a prueba tus conocimientos.</p>
              </div>
              <button
                onClick={onOpenChat}
                className="whitespace-nowrap bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/20 flex items-center gap-2"
              >
                <span>🤖</span> Hablar con la IA
              </button>
            </div>
          </>
        ) : (
          <div className="animate-fade-in space-y-6">
            <div className="p-5 bg-slate-100 dark:bg-[#12141c] border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">Instrucciones del Reto</h2>
                {contextoEvaluacion && (
                  <span className="px-2 py-1 bg-violet-500/20 text-violet-400 text-xs font-bold rounded">Generado por IA</span>
                )}
              </div>
              <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                <ReactMarkdown
                  components={{
                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-slate-800 dark:text-slate-200" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li {...props} />,
                    code: ({node, className, children, ...props}) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match && !String(children).includes('\n');
                      return isInline ? (
                        <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-violet-600 dark:text-violet-400 font-mono text-[13px]" {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className="block bg-slate-200 dark:bg-slate-800 p-3 rounded-lg text-violet-600 dark:text-violet-400 font-mono text-[13px] my-3 overflow-x-auto" {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                >
                  {contextoEvaluacion || route?.description || "Escribe el código necesario para resolver este ejercicio."}
                </ReactMarkdown>
              </div>
            </div>

            <CodeWorkspace onSendToAI={onSendToAI} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteDetail;