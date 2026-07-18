import { useState } from 'react';

const RouteBuilder = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    estimatedTime: '',
    difficulty: 'BEGINNER',
    evaluationRules: '',
    modules: []
  });

  const addModule = () => {
    setFormData({
      ...formData,
      modules: [...formData.modules, { title: '', description: '', resourceIds: [] }]
    });
  };

  const updateModule = (index, field, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[index][field] = value;
    setFormData({ ...formData, modules: updatedModules });
  };

  const removeModule = (index) => {
    const updatedModules = formData.modules.filter((_, i) => i !== index);
    setFormData({ ...formData, modules: updatedModules });
  };

  const handleResourceChange = (moduleIndex, resourceString) => {
    const ids = resourceString.split(',').map(id => id.trim()).filter(id => id !== '');
    updateModule(moduleIndex, 'resourceIds', ids);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar al backend:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Constructor de Rutas</h1>
        <p className="text-slate-400 mt-2 text-lg">Crea rutas de aprendizaje estructuradas por módulos para la EPN.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#12141c] p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Título de la Ruta</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-[#1a1d27] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Categoría</label>
            <input 
              type="text" 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-[#1a1d27] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Reglas de Evaluación (Para la IA)</label>
          <textarea 
            value={formData.evaluationRules}
            onChange={(e) => setFormData({...formData, evaluationRules: e.target.value})}
            className="w-full bg-[#1a1d27] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500 transition-colors h-24 resize-none"
            placeholder="Ej: El estudiante no puede usar condicionales if-else para este reto..."
          />
        </div>

        <div className="border-t border-slate-800 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Módulos de la Ruta</h3>
            <button 
              type="button" 
              onClick={addModule}
              className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-sm font-medium transition-colors"
            >
              + Agregar Módulo
            </button>
          </div>

          <div className="space-y-4">
            {formData.modules.map((mod, index) => (
              <div key={index} className="bg-[#1a1d27] p-4 rounded-xl border border-slate-700 relative group">
                <button 
                  type="button" 
                  onClick={() => removeModule(index)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
                
                <h4 className="text-emerald-500 font-medium mb-3">Módulo {index + 1}</h4>
                
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Título del Módulo"
                    value={mod.title}
                    onChange={(e) => updateModule(index, 'title', e.target.value)}
                    className="w-full bg-[#232736] border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm"
                    required
                  />
                  <textarea 
                    placeholder="Descripción del módulo..."
                    value={mod.description}
                    onChange={(e) => updateModule(index, 'description', e.target.value)}
                    className="w-full bg-[#232736] border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm h-16 resize-none"
                  />
                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-1">IDs de Recursos (Separados por coma)</label>
                    <input 
                      type="text" 
                      placeholder="Ej: 1, 4, 7"
                      value={mod.resourceIds.join(', ')}
                      onChange={(e) => handleResourceChange(index, e.target.value)}
                      className="w-full bg-[#232736] border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
          >
            Guardar Ruta Completa
          </button>
        </div>
      </form>
    </div>
  );
};

export default RouteBuilder;