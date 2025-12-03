import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Search, CheckCircle, Clock, Fish, Check, Camera, RotateCw, XCircle, Image as ImageIcon, Loader2, Scan, Info, ShieldCheck, ChefHat, Utensils } from 'lucide-react';
import { BATCHES, BatchData } from '../lib/data';

const Trace = () => {
  const [scanning, setScanning] = useState(true);
  const [manualInput, setManualInput] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0); // 0: Init, 1: Texture, 2: Database, 3: Done
  const [source, setSource] = useState<'scan' | 'manual' | 'image'>('scan');
  const [code, setCode] = useState('');
  const [result, setResult] = useState<BatchData | null>(null);
  const [error, setError] = useState('');

  // Auto-hide result when switching back to scan
  const resetScan = () => {
    setResult(null);
    setError('');
    setCode('');
    setScanning(true);
    setManualInput(false);
    setAnalyzing(false);
    setAnalysisStep(0);
    setSource('scan');
  };

  const processCode = (rawCode: string, fromSource: 'scan' | 'manual' | 'image' = 'scan') => {
    // Format cleanup logic (in case QR has URL or spaces)
    const cleanCode = rawCode.trim().toUpperCase();
    setCode(cleanCode);
    setSource(fromSource);

    const found = BATCHES.find(b => b.code.toUpperCase() === cleanCode);
    
    if (found) {
      setResult(found);
      setScanning(false);
      setError('');
    } else {
      setError(`Kode batch "${cleanCode}" tidak ditemukan.`);
      setScanning(false);
    }
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    processCode(code, 'manual');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Mock Validation: Rejects small files
      if (file.size < 5000) { // 5KB
         setError("Objek tidak terdeteksi dengan jelas. Pastikan foto ikan/kemasan memiliki pencahayaan yang baik.");
         return;
      }

      setAnalyzing(true);
      setScanning(false);
      setAnalysisStep(1);
      
      // Simulation Sequence (Total 3s)
      // Step 1: Visual Analysis
      setTimeout(() => {
        setAnalysisStep(2);
      }, 1500); // After 1.5s switch to Verification

      // Step 2: Verification & Done
      setTimeout(() => {
        setAnalysisStep(3);
        setAnalyzing(false);
        // Mock success with our demo batch
        processCode('BATCH-JBG-01', 'image');
      }, 3000); // Finish at 3s
    }
  };

  const getAnalysisText = () => {
      if (analysisStep === 1) return "Menganalisa tekstur visual...";
      if (analysisStep === 2) return "Memverifikasi Batch Code...";
      return "Selesai!";
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-24 pb-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-700">
          Lacak Kesegaran
        </h1>
        <p className="text-gray-500">
          Scan QR code atau foto ikan Anda untuk validasi AI.
        </p>
      </div>

      {/* Main Action Area */}
      {!result && (
        <div className="relative glass-card rounded-[2.5rem] overflow-hidden mb-8 min-h-[400px] flex flex-col shadow-2xl shadow-blue-900/10">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => { setScanning(true); setManualInput(false); setError(''); }}
              className={`flex-1 py-4 font-bold text-sm transition-all ${!manualInput ? 'bg-brand-blue/10 text-brand-blue' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Camera size={18} /> Pemindai
              </div>
            </button>
            <button 
              onClick={() => { setScanning(false); setManualInput(true); setError(''); }}
              className={`flex-1 py-4 font-bold text-sm transition-all ${manualInput ? 'bg-brand-blue/10 text-brand-blue' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              <div className="flex items-center justify-center gap-2">
                <Search size={18} /> Input Manual
              </div>
            </button>
          </div>

          {/* Analyzing Overlay with Grid Animation */}
          {analyzing && (
            <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
              {/* Grid Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,#4DBBFF_1px,transparent_1px),linear-gradient(to_bottom,#4DBBFF_1px,transparent_1px)]"></div>
              
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-brand-blue/30 rounded-full animate-ping duration-1000"></div>
                <div className="relative bg-white/10 p-6 rounded-full border border-brand-blue shadow-[0_0_30px_rgba(77,187,255,0.5)]">
                  <Scan size={48} className="text-brand-blue animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">AI Processing...</h3>
              <p className="text-brand-blue font-mono text-sm animate-pulse">
                {getAnalysisText()}
              </p>
              
              {/* Progress Bar */}
              <div className="w-48 h-1 bg-gray-800 rounded-full mt-6 overflow-hidden">
                 <div className="h-full bg-brand-blue animate-[progress_3.5s_ease-in-out_forwards]" style={{width: '0%'}}></div>
              </div>
            </div>
          )}

          {/* Scanner View */}
          {!manualInput ? (
            <div className="relative flex-grow bg-black flex flex-col overflow-hidden">
               <div className="relative flex-grow flex items-center justify-center bg-black">
               {scanning ? (
                 <div className="w-full h-full relative">
                    <Scanner 
                        onScan={(result) => result[0] && processCode(result[0].rawValue, 'scan')}
                        onError={(err: any) => {
                            // Only show error if it's a permission issue
                            if (err?.message?.includes('permission') || err?.message?.includes('device')) {
                                setError("Mohon izinkan akses kamera untuk memindai QR Code.");
                                setScanning(false);
                            }
                        }}
                        styles={{
                            container: { width: '100%', height: '100%' },
                            video: { objectFit: 'cover' }
                        }}
                    />
                    {/* Overlay UI */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white/50 rounded-3xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue shadow-[0_0_15px_#4DBBFF] animate-scan"></div>
                            {/* Corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-blue -mt-1 -ml-1 rounded-tl-xl"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-blue -mt-1 -mr-1 rounded-tr-xl"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-blue -mb-1 -ml-1 rounded-bl-xl"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-blue -mb-1 -mr-1 rounded-br-xl"></div>
                        </div>
                        <p className="absolute bottom-8 w-full text-center text-white/80 text-sm font-medium px-4">
                            Arahkan kamera ke QR Code
                        </p>
                    </div>
                 </div>
               ) : (
                 <div className="text-white text-center p-6 w-full">
                    <XCircle size={48} className="mx-auto mb-4 text-red-500" />
                    <h3 className="text-xl font-bold mb-2">Scan Gagal</h3>
                    <p className="text-gray-400 mb-6">{error || "Tidak ada kode terdeteksi."}</p>
                    <button onClick={() => { setScanning(true); setError(''); }} className="btn-primary px-6 py-2 rounded-full flex items-center gap-2 mx-auto">
                        <RotateCw size={18} /> Coba Lagi
                    </button>
                 </div>
               )}
               </div>
               
               {/* AI Upload Section */}
               <div className="bg-white p-4 z-20 border-t border-gray-100 rounded-t-[2rem] -mt-4 relative shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-4 w-full mb-4">
                    <div className="h-px bg-gray-200 flex-grow"></div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Atau / Or</span>
                    <div className="h-px bg-gray-200 flex-grow"></div>
                  </div>
                  
                  <label className="flex items-center justify-center gap-3 w-full p-4 border-2 border-dashed border-brand-blue/30 rounded-2xl bg-brand-blue/5 hover:bg-brand-blue/10 transition-colors cursor-pointer group">
                    <div className="bg-white p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform text-brand-blue">
                      <ImageIcon size={24} />
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-brand-dark text-sm">Upload Foto Kemasan/Ikan</span>
                      <span className="block text-xs text-gray-500">AI kami akan mendeteksi kodenya</span>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileUpload}
                    />
                  </label>
               </div>
            </div>
          ) : (
            /* Manual Input View */
            <div className="p-8 flex flex-col justify-center h-full bg-white/50">
                <form onSubmit={handleManualSearch} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Kode Batch</label>
                        <input
                            type="text"
                            placeholder="Contoh: BATCH-JBG-01"
                            className="w-full px-6 py-4 bg-white rounded-2xl border border-gray-200 focus:ring-4 focus:ring-brand-blue/20 focus:border-brand-blue outline-none transition-all text-lg font-medium"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full btn-primary py-4 rounded-2xl text-lg shadow-lg shadow-brand-blue/30"
                    >
                        Lacak Sekarang
                    </button>
                </form>
                {error && (
                    <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-2xl text-center text-sm font-medium border border-red-100">
                        {error}
                    </div>
                )}
            </div>
          )}
        </div>
      )}

      {/* Result Card */}
      {result && (
        <div className="glass-card rounded-[2rem] md:rounded-[2.5rem] overflow-hidden animate-in slide-in-from-bottom-10 duration-700 shadow-2xl">
          {/* Success Header */}
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
                <CheckCircle size={140} />
            </div>
            <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <Check size={12} /> Terverifikasi
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-1 tracking-tight">Sangat Segar</h2>
                <p className="opacity-90 text-lg">Batch #BATCH-JBG-01</p>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="p-6 md:p-8 bg-white/80">
            
            {/* Status Jaminan Aman */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-8 flex gap-3 items-start">
                <div className="bg-green-500 text-white p-1.5 rounded-full mt-0.5">
                    <ShieldCheck size={16} />
                </div>
                <div>
                    <h3 className="font-bold text-green-800 text-sm mb-1">Jaminan Aman</h3>
                    <p className="text-green-700 text-sm leading-relaxed">
                        Lolos uji laboratorium bebas mikroba dan logam berat.
                    </p>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-dashed border-brand-blue/30 ml-4 space-y-8 pb-4">
              
              {/* Timeline 1: Panen Tambak */}
              <div className="relative pl-10 group">
                <div className="absolute -left-[11px] top-0 w-6 h-6 bg-brand-blue rounded-full border-4 border-white shadow-lg"></div>
                <h3 className="font-bold text-lg mb-1 text-brand-dark">Panen Tambak</h3>
                <p className="text-gray-500 text-xs font-medium mb-2">02 Des 2025, 06:00 WIB</p>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-sm text-gray-700">
                    <span className="font-bold text-brand-blue">Lokasi:</span> Kolam Deras A3 - Jombang
                </div>
              </div>

              {/* Timeline 2: Kualitas Air */}
              <div className="relative pl-10 group">
                <div className="absolute -left-[11px] top-0 w-6 h-6 bg-white border-2 border-brand-blue rounded-full shadow-sm"></div>
                <h3 className="font-bold text-base mb-1 text-brand-dark">Kualitas Air</h3>
                <p className="text-sm text-gray-600">pH 7.2 Stabil - Bebas Limbah</p>
              </div>

              {/* Timeline 3: Pakan */}
              <div className="relative pl-10 group">
                <div className="absolute -left-[11px] top-0 w-6 h-6 bg-white border-2 border-brand-blue rounded-full shadow-sm"></div>
                <h3 className="font-bold text-base mb-1 text-brand-dark">Pakan</h3>
                <p className="text-sm text-gray-600">Pelet Organik High Protein</p>
              </div>

              {/* Timeline 4: Pengolahan */}
              <div className="relative pl-10 group">
                <div className="absolute -left-[11px] top-0 w-6 h-6 bg-brand-blue rounded-full border-4 border-white shadow-lg"></div>
                <h3 className="font-bold text-lg mb-1 text-brand-dark">Pengolahan</h3>
                <p className="text-gray-500 text-xs font-medium mb-2">02 Des 2025, 09:00 WIB</p>
              </div>

            </div>

            {/* Tech Specs */}
            <div className="grid grid-cols-2 gap-4 mt-6 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
                    <span className="text-2xl mb-2">❄️</span>
                    <div className="font-extrabold text-brand-dark text-lg">-18°C</div>
                    <div className="text-xs text-gray-400 font-bold uppercase">Suhu Simpan</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
                    <span className="text-2xl mb-2">📦</span>
                    <div className="font-extrabold text-brand-dark text-lg">Vacuum</div>
                    <div className="text-xs text-gray-400 font-bold uppercase">Teknologi</div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="border-t border-gray-100 pt-6 text-center">
                <p className="text-xs text-gray-400 font-medium">
                    Powered by <span className="text-brand-blue font-bold">Thriby</span> - Platform pelacakan kesegaran ikan berbasis blockchain dan AI.
                </p>
            </div>

            <button 
                onClick={resetScan}
                className="mt-6 w-full btn-primary py-4 rounded-2xl shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 text-base"
            >
                <RotateCw size={20} /> Scan Kemasan Lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trace;

