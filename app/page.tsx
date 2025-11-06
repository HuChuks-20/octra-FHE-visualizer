'use client'

import React, { useState } from 'react';
import { Lock, Unlock, Plus, X } from 'lucide-react';

export default function FHEVisualizer() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  /*const [encrypted1, setEncrypted1] = useState(null);
  const [encrypted2, setEncrypted2] = useState(null);
  const [encryptedResult, setEncryptedResult] = useState(null);
  const [decryptedResult, setDecryptedResult] = useState(null);*/
  const [encrypted1, setEncrypted1] = useState<string | null>(null);
  const [encrypted2, setEncrypted2] = useState<string | null>(null);
  const [encryptedResult, setEncryptedResult] = useState<string | null>(null);
  const [decryptedResult, setDecryptedResult] = useState<number | null>(null);
  const [step, setStep] = useState(0);

 const generateFakeEncryption = (num: string) => {
  const base = parseInt(num) || 0;
    return (base * 7919 + 31337).toString(16).toUpperCase().padStart(16, '0');
  };
 
  const handleEncrypt = () => {
    if (num1 && num2) {
      setEncrypted1(generateFakeEncryption(num1));
      setEncrypted2(generateFakeEncryption(num2));
      setStep(1);
      setEncryptedResult(null);
      setDecryptedResult(null);
    }
  };

  const handleCompute = () => {
    if (encrypted1 && encrypted2) {
      const n1 = parseInt(num1);
      const n2 = parseInt(num2);
      const result = operation === 'add' ? n1 + n2 : n1 * n2;
      setEncryptedResult(generateFakeEncryption(result.toString()));
      setStep(2);
      setDecryptedResult(null);
    }
  };

  const handleDecrypt = () => {
    if (encryptedResult) {
      const n1 = parseInt(num1);
      const n2 = parseInt(num2);
      const result = operation === 'add' ? n1 + n2 : n1 * n2;
      setDecryptedResult(result);
      setStep(3);
    }
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setOperation('add');
    setEncrypted1(null);
    setEncrypted2(null);
    setEncryptedResult(null);
    setDecryptedResult(null);
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">
            OCTRA FHE Visualizer
          </h1>
          <p className="text-gray-400 text-lg">
            Compute on encrypted data without ever decrypting it
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/50 backdrop-blur border border-blue-600/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-500 mb-4 flex items-center gap-2">
              <Lock size={20} />
              Input Values
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Number 1</label>
                <input
                  type="number"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  className="w-full bg-slate-800 border border-blue-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600"
                  placeholder="Enter first number"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Number 2</label>
                <input
                  type="number"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className="w-full bg-slate-800 border border-blue-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600"
                  placeholder="Enter second number"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Operation</label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  className="w-full bg-slate-800 border border-blue-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-600"
                >
                  <option value="add">Addition (+)</option>
                  <option value="multiply">Multiplication (×)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur border border-blue-600/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Process Steps</h3>
            <div className="space-y-3">
              <div className={`p-3 rounded-lg border ${step >= 0 ? 'bg-blue-900/20 border-blue-600/40' : 'bg-slate-800/30 border-slate-700/30'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Step 1: Encrypt Data</span>
                  {step >= 1 && <span className="text-green-400">✓</span>}
                </div>
              </div>
              <div className={`p-3 rounded-lg border ${step >= 2 ? 'bg-blue-900/20 border-blue-600/40' : 'bg-slate-800/30 border-slate-700/30'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Step 2: Compute on Encrypted</span>
                  {step >= 2 && <span className="text-green-400">✓</span>}
                </div>
              </div>
              <div className={`p-3 rounded-lg border ${step >= 3 ? 'bg-blue-900/20 border-blue-600/40' : 'bg-slate-800/30 border-slate-700/30'}`}>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Step 3: Decrypt Result</span>
                  {step >= 3 && <span className="text-green-400">✓</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {step >= 1 && (
          <div className="bg-slate-900/50 backdrop-blur border border-blue-600/20 rounded-xl p-6 mb-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-blue-500 mb-4 flex items-center gap-2">
              <Lock size={20} />
              Encrypted Values
            </h3>
            <div className="space-y-3">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-600/20">
                <div className="text-gray-400 text-sm mb-1">Encrypted Number 1:</div>
                <div className="text-blue-400 font-mono text-sm break-all">{encrypted1}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-600/20">
                <div className="text-gray-400 text-sm mb-1">Encrypted Number 2:</div>
                <div className="text-blue-400 font-mono text-sm break-all">{encrypted2}</div>
              </div>
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className="bg-slate-900/50 backdrop-blur border border-blue-600/20 rounded-xl p-6 mb-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-blue-500 mb-4">Encrypted Computation Result</h3>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-600/20">
              <div className="text-gray-400 text-sm mb-1">Encrypted Result:</div>
              <div className="text-blue-400 font-mono text-sm break-all">{encryptedResult}</div>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              The computation happened on encrypted data. No one saw the actual numbers.
            </p>
          </div>
        )}

        {step >= 3 && (
          <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 backdrop-blur border border-blue-600/40 rounded-xl p-6 mb-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-blue-500 mb-4 flex items-center gap-2">
              <Unlock size={20} />
              Decrypted Result
            </h3>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {decryptedResult}
              </div>
              <p className="text-gray-400">
                {num1} {operation === 'add' ? '+' : '×'} {num2} = {decryptedResult}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {step === 0 && (
            <button
              onClick={handleEncrypt}
              disabled={!num1 || !num2}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2 disabled:cursor-not-allowed"
            >
              <Lock size={20} />
              Encrypt Data
            </button>
          )}
          {step === 1 && (
            <button
              onClick={handleCompute}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              {operation === 'add' ? <Plus size={20} /> : <X size={20} />}
              Compute on Encrypted
            </button>
          )}
          {step === 2 && (
            <button
              onClick={handleDecrypt}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <Unlock size={20} />
              Decrypt Result
            </button>
          )}
          {step > 0 && (
            <button
              onClick={handleReset}
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold transition-all"
            >
              Reset
            </button>
          )}
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>This is a simplified visualization. Real FHE uses lattice-based cryptography and hypergraph structures.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}