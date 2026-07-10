import React, { useState } from 'react';
import { useAdminStore } from '../lib/store';
import { uploadToCloudinary } from '../lib/cloudinary';
import { Save, Upload, Cloud, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  const { data, updateData } = useAdminStore();
  const [isUploading, setIsUploading] = useState(false);
  const [localData, setLocalData] = useState(data);

  const handleSave = () => {
    updateData(localData);
    alert('Changes saved successfully!');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, resourceType: 'image' | 'raw' = 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file, resourceType);
      
      if (field.startsWith('screenshot-')) {
        const id = field.split('-')[1];
        setLocalData(prev => ({
          ...prev,
          screenshots: prev.screenshots.map(s => s.id === id ? { ...s, url } : s)
        }));
      } else {
        setLocalData(prev => ({ ...prev, [field]: url }));
      }
    } catch (error) {
      alert('Upload failed: ' + (error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base text-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Website
            </Link>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Cloud className="text-blue-500" />
              Omni Cloud Admin
            </h1>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>

        <div className="space-y-12">
          {/* General Information */}
          <section className="glass p-8">
            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">General Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">App Description</label>
                <textarea 
                  value={localData.appDescription}
                  onChange={e => setLocalData({...localData, appDescription: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500 outline-none h-32"
                />
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2">Hero Background</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-20 rounded-lg overflow-hidden border border-white/10">
                    <img src={localData.heroBackgroundUrl} className="w-full h-full object-cover" alt="Hero bg" />
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'heroBackgroundUrl')} />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Latest Release */}
          <section className="glass p-8">
            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Latest Release (APK)</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">Version</label>
                <input 
                  type="text"
                  value={localData.latestRelease?.version || ''}
                  onChange={e => setLocalData({...localData, latestRelease: {...localData.latestRelease!, version: e.target.value}})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Release Date</label>
                <input 
                  type="date"
                  value={localData.latestRelease?.releaseDate || ''}
                  onChange={e => setLocalData({...localData, latestRelease: {...localData.latestRelease!, releaseDate: e.target.value}})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">APK Size</label>
                <input 
                  type="text"
                  value={localData.latestRelease?.size || ''}
                  onChange={e => setLocalData({...localData, latestRelease: {...localData.latestRelease!, size: e.target.value}})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Upload APK</label>
                <label className="flex items-center justify-center gap-2 w-full h-[46px] bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-xl cursor-pointer transition-colors border border-blue-500/30">
                  <Upload className="w-4 h-4" />
                  {isUploading ? 'Uploading...' : (localData.latestRelease?.apkUrl ? 'Replace APK' : 'Upload APK')}
                  <input type="file" className="hidden" accept=".apk" onChange={e => handleFileUpload(e, 'latestRelease.apkUrl', 'raw')} />
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/60 mb-2">What's New (Changelog)</label>
                <textarea 
                  value={localData.latestRelease?.whatsNew || ''}
                  onChange={e => setLocalData({...localData, latestRelease: {...localData.latestRelease!, whatsNew: e.target.value}})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none h-24"
                />
              </div>
            </div>
          </section>

          {/* About Developer */}
          <section className="glass p-8">
            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">About Developer</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10">
                  <img src={localData.developerPhotoUrl} className="w-full h-full object-cover" alt="Developer" />
                </div>
                <label className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                  <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'developerPhotoUrl')} />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Name</label>
                  <input 
                    type="text"
                    value={localData.developerName}
                    onChange={e => setLocalData({...localData, developerName: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-white/60 mb-2">Bio</label>
                  <textarea 
                    value={localData.developerBio}
                    onChange={e => setLocalData({...localData, developerBio: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none h-24"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Screenshots */}
          <section className="glass p-8">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold">Screenshots Gallery</h2>
              <button 
                onClick={() => setLocalData({
                  ...localData, 
                  screenshots: [...localData.screenshots, { id: Date.now().toString(), url: '' }]
                })}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Screenshot
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {localData.screenshots.map((s, i) => (
                <div key={s.id} className="relative group">
                  <div className="aspect-[9/16] bg-black/50 border border-white/10 rounded-xl overflow-hidden mb-2">
                    {s.url ? (
                      <img src={s.url} alt="Screenshot" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20">Empty</div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <label className="flex-1 flex items-center justify-center py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg cursor-pointer text-sm transition-colors">
                      Upload
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, `screenshot-${s.id}`)} />
                    </label>
                    <button 
                      onClick={() => setLocalData({
                        ...localData,
                        screenshots: localData.screenshots.filter(img => img.id !== s.id)
                      })}
                      className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="glass p-8">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold">Features</h2>
              <button 
                onClick={() => setLocalData({
                  ...localData, 
                  features: [...localData.features, { id: Date.now().toString(), title: 'New Feature', description: '', iconName: 'cloud' }]
                })}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Feature
              </button>
            </div>
            <div className="space-y-4">
              {localData.features.map(f => (
                <div key={f.id} className="p-4 bg-black/30 border border-white/5 rounded-xl flex gap-4">
                  <div className="flex-1 space-y-3">
                    <input 
                      type="text" value={f.title}
                      onChange={e => setLocalData({
                        ...localData, 
                        features: localData.features.map(feat => feat.id === f.id ? {...feat, title: e.target.value} : feat)
                      })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none"
                    />
                    <textarea 
                      value={f.description}
                      onChange={e => setLocalData({
                        ...localData, 
                        features: localData.features.map(feat => feat.id === f.id ? {...feat, description: e.target.value} : feat)
                      })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none h-20"
                    />
                  </div>
                  <button 
                    onClick={() => setLocalData({
                      ...localData,
                      features: localData.features.filter(feat => feat.id !== f.id)
                    })}
                    className="p-2 self-start bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="glass p-8">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold">FAQs</h2>
              <button 
                onClick={() => setLocalData({
                  ...localData, 
                  faqs: [...localData.faqs, { id: Date.now().toString(), question: 'New Question', answer: '' }]
                })}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
              >
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>
            <div className="space-y-4">
              {localData.faqs.map(faq => (
                <div key={faq.id} className="p-4 bg-black/30 border border-white/5 rounded-xl flex gap-4">
                  <div className="flex-1 space-y-3">
                    <input 
                      type="text" value={faq.question}
                      onChange={e => setLocalData({
                        ...localData, 
                        faqs: localData.faqs.map(f => f.id === faq.id ? {...f, question: e.target.value} : f)
                      })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none"
                    />
                    <textarea 
                      value={faq.answer}
                      onChange={e => setLocalData({
                        ...localData, 
                        faqs: localData.faqs.map(f => f.id === faq.id ? {...f, answer: e.target.value} : f)
                      })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none h-20"
                    />
                  </div>
                  <button 
                    onClick={() => setLocalData({
                      ...localData,
                      faqs: localData.faqs.filter(f => f.id !== faq.id)
                    })}
                    className="p-2 self-start bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Contact & Links */}
          <section className="glass p-8">
            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Contact & Social Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-white/60 mb-2">Email Address</label>
                <input 
                  type="email" value={localData.contactEmail}
                  onChange={e => setLocalData({...localData, contactEmail: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Telegram Username</label>
                <input 
                  type="text" value={localData.contactTelegram}
                  onChange={e => setLocalData({...localData, contactTelegram: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">GitHub Username</label>
                <input 
                  type="text" value={localData.contactGithub}
                  onChange={e => setLocalData({...localData, contactGithub: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Website URL</label>
                <input 
                  type="url" value={localData.contactWebsite}
                  onChange={e => setLocalData({...localData, contactWebsite: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
