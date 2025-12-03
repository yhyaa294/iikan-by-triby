import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Search, CheckCircle, Clock, Fish, Check, Camera, RotateCw, XCircle, Image as ImageIcon, Loader2, Scan } from 'lucide-react';
import { BATCHES, BatchData } from '../lib/data';

const Trace = () => {
  const [scanning, setScanning] = useState(true);
  const [manualInput, setManualInput] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
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
      setAnalyzing(true);
      setScanning(false);
      
      // Simulate AI Analysis Delay
      setTimeout(() => {
        setAnalyzing(false);
        // Mock success with our demo batch
        processCode('BATCH-JBG-01', 'image');
      }, 2500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-20 pb-8 md:pb-12">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2 md:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-700">
          Lacak Kesegaran
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Scan QR code pada kemasan untuk melihat perjalanan ikanmu.
        </p>
      </div>

      {/* Main Action Area */}
      {!result && (
        <div className="relative glass-card rounded-3xl overflow-hidden mb-6 md:mb-8 min-h-[400px] flex flex-col">
          
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

          {/* Analyzing Overlay */}
          {analyzing && (
            <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-brand-blue/20 rounded-full animate-ping"></div>
                <div className="relative bg-white p-4 rounded-full shadow-xl">
                  <Loader2 size={48} className="text-brand-blue animate-spin" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">AI Sedang Menganalisa...</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Sistem cerdas kami sedang mendeteksi kode batch dari citra yang Anda unggah.
              </p>
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
                        onError={(err) => {
                            console.error(err);
                            // Only show error if it's a permission issue or critical failure, 
                            // not just "no code found"
                            if (err?.message?.includes('permission') || err?.message?.includes('device')) {
                                setError("Mohon izinkan akses kamera untuk memindai QR Code pada kemasan.");
                                setScanning(false);
                            }
                        }}
                        components={{ audio: false }} // Disable beep sound
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
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button onClick={() => setScanning(true)} className="btn-primary px-6 py-2 rounded-full flex items-center gap-2 mx-auto">
                        <RotateCw size={18} /> Coba Lagi
                    </button>
                    <button 
                        onClick={() => { setManualInput(true); setError(''); }}
                        className="mt-6 text-sm font-bold text-white/70 hover:text-white transition-colors border-b border-dashed border-white/30 pb-0.5 hover:border-white"
                    >
                        Gunakan Input Manual Saja
                    </button>
                 </div>
               )}
               </div>
               
               {/* AI Upload Section */}
               <div className="bg-white p-4 z-20 border-t border-gray-100 rounded-t-3xl -mt-4 relative shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-4 w-full">
                    <div className="h-px bg-gray-200 flex-grow"></div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Atau / Or</span>
                    <div className="h-px bg-gray-200 flex-grow"></div>
                  </div>
                  
                  <label className="mt-4 flex items-center justify-center gap-3 w-full p-4 border-2 border-dashed border-brand-blue/30 rounded-2xl bg-brand-blue/5 hover:bg-brand-blue/10 transition-colors cursor-pointer group">
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
        <div className="glass-card rounded-[2rem] md:rounded-[2.5rem] overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
          {/* Success Header */}
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-6 md:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
                <CheckCircle size={120} />
            </div>
            <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <Check size={12} /> Terverifikasi
                    </span>
                    {source === 'image' && (
                       <span className="bg-brand-dark/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-white/20">
                          <Scan size={12} /> AI Image Scan
                       </span>
                    )}
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-1">Sangat Segar</h2>
                <p className="opacity-90 text-base md:text-lg">Batch #{result.code}</p>
            </div>
          </div>

          {/* Detailed Timeline */}
          <div className="p-6 md:p-8 bg-white/80">
            <div className="relative border-l-2 border-dashed border-brand-blue/30 ml-4 space-y-8 md:space-y-12 pb-4">
              
              {/* Timeline Item 1 */}
              <div className="relative pl-8 md:pl-10 group">
                <div className="absolute -left-[11px] top-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform"></div>
                <div className="bg-green-50 p-4 md:p-5 rounded-2xl border border-green-100 shadow-sm">
                    <h3 className="font-bold text-base md:text-lg mb-1 text-gray-800 flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-600" /> Jaminan Aman
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Lolos uji laboratorium bebas mikroba dan logam berat.
                    </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-8 md:pl-10 group">
                <div className="absolute -left-[11px] top-0 w-6 h-6 bg-brand-blue rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform"></div>
                <h3 className="font-bold text-base md:text-lg mb-2 text-gray-800">Pengolahan</h3>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-3 flex items-center gap-1">
                    <Clock size={12} /> {result.processingTime}
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 md:p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                    <span className="text-2xl mb-1">❄️</span>
                    <div className="font-bold text-sm text-gray-800">-18°C</div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Suhu Simpan</div>
                  </div>
                  <div className="bg-white p-3 md:p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                    <span className="text-2xl mb-1">📦</span>
                    <div className="font-bold text-sm text-gray-800">Vacuum</div>
                    <div className="text-[10px] text-gray-400 uppercase font-bold">Teknologi</div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative pl-8 md:pl-10 group">
                <div className="absolute -left-[11px] top-0 w-6 h-6 bg-brand-blue rounded-full border-4 border-white shadow-lg group-hover:scale-110 transition-transform"></div>
                <h3 className="font-bold text-base md:text-lg mb-2 text-gray-800">Panen Tambak</h3>
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-3 flex items-center gap-1">
                    <Fish size={12} /> {result.harvestDate}
                </p>
                
                <div className="bg-blue-50/50 p-4 md:p-5 rounded-2xl border border-blue-100">
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                        <span className="text-gray-500 text-xs md:text-sm">Lokasi</span>
                        <span className="font-bold text-gray-800 text-xs md:text-sm">{result.pondId}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-blue-100">
                        <span className="text-gray-500 text-xs md:text-sm">Kualitas Air</span>
                        <span className="font-bold text-brand-blue text-xs md:text-sm">{result.phLevel}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-xs md:text-sm">Pakan</span>
                        <span className="font-bold text-gray-800 text-xs md:text-sm">{result.feedType}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <button 
                onClick={resetScan}
                className="mt-6 md:mt-8 w-full btn-primary py-3 md:py-4 rounded-2xl shadow-xl shadow-brand-blue/20 flex items-center justify-center gap-2 text-sm md:text-base"
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
